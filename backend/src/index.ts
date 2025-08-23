import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
const app = express();
const pg = new PrismaClient();
app.use(express.json());
app.use(cors());


app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await pg.user.findUnique({ where: { username } });
        if (user) {
            return res.status(409).send('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await pg.user.create({
            data: {
                username: username.trim().replace(/\s+/g, ""),
                password: hashedPassword
            }
        });
        res.status(201).send('User created');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await pg.user.findUnique({ where: { username } });
        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid) {
                const token = jwt.sign({ id: user.id, username: user.username }, 'secret', { expiresIn: '1h' });
                console.log(user);
                return res.json({ token : token , username: user.username });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
    res.status(401).send('Invalid credentials');
});


async function UserMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authHeader = req.headers['authorization'];
    let token: string | undefined;
    if (typeof authHeader === 'string') {
        token = authHeader.split(' ')[1];
    }
    if (!token) {
        return res.status(401).send('Access denied');
    }
    try {
        const decoded = jwt.verify(token, 'secret');
        // @ts-ignore
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).send('Invalid token');
    }
};

app.post('/senddata', UserMiddleware, async (req, res) => {
    const { type, amount, description, date, category } = req.body;
    const floatedamount = parseFloat(amount);
    const [day, month, year] = date.split('/').map(Number);
    const dateObj = new Date(date);
const monthName = dateObj.toLocaleString("default", { month: "long" });
console.log(monthName); // "August"
    
    try {
        if (type === "income") {
            await pg.income.create({
                data: {
                    amount: floatedamount,
                    description,
                    date: dateObj.toString(),
                    month: monthName,
                    // @ts-ignore
                    userId: req.user.id
                }
            });
        }

        if (type === "expense") {
            await pg.expense.create({
                data: {
                    amount: floatedamount,
                    description,
                    category,
                    date: dateObj.toString(),
                    month: monthName,
                    // @ts-ignore
                    userId: req.user.id
                }
            });
        }
        // 🔹 After adding transaction, recalc balance for that month
        const [incomes, expenses] = await Promise.all([
            pg.income.findMany({
                where: {
                    // @ts-ignore
                    userId: req.user.id,
                    month: monthName
                }
            }),
            pg.expense.findMany({
                where: {
                    // @ts-ignore
                    userId: req.user.id,
                    month: monthName
                }
            })
        ]);

        const totalIncome = incomes.reduce((acc, i) => acc + i.amount, 0);
        const totalExpense = expenses.reduce((acc, e) => acc + e.amount, 0);
        const netBalance = totalIncome - totalExpense;

        await pg.balance.upsert({
            where: {
                userId_month: {
                    // @ts-ignore
                    userId: req.user.id,
                    month: monthName
                }
            },
            update: {
                amount: netBalance
            },
            create: {
                // @ts-ignore
                userId: req.user.id,
                month: monthName,
                amount: netBalance
            }
        });
        // 🔹 Create a transaction record
        await pg.transaction.create({
            data: {
                type,
                amount: floatedamount,
                description,
                date: dateObj.toString(),
                // @ts-ignore
                userId: req.user.id
            }
        });

        res.json({ message: `${type} created successfully and balance updated`, balance: netBalance });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/getdata', UserMiddleware, async (req, res) => {
    // Handle the data retrieval
    // @ts-ignore
    const userId = req.user.id;
const previousMonth = new Date();
previousMonth.setMonth(previousMonth.getMonth() - 1);

const currentMonth = new Date().toLocaleString("default", { month: "long" });
const prevMonth = previousMonth.toLocaleString("default", { month: "long" });

try {
    // Use Promise.all for concurrent queries
    const [
        currentmonthbalance,
        previousmonthbalance, 
        currentmonthexpense,
        previousmonthexpense
    ] = await Promise.all([
        pg.balance.findMany({ where: { userId, month: currentMonth } }),
        pg.balance.findMany({ where: { userId, month: prevMonth } }),
        pg.expense.findMany({ where: { userId, month: currentMonth } }),
        pg.expense.findMany({ where: { userId, month: prevMonth } })
    ]);

    res.json({
        currentmonthbalance,
        currentmonthexpense,
        previousmonthbalance,
        previousmonthexpense
    });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

app.get('/getChartData' , UserMiddleware , async(req , res) =>{
   // @ts-ignore
   const userId = req.user.id;
   try {
       const [incomes, expenses, balance , transactions] = await Promise.all([
           pg.income.findMany({
               where: {
                   userId
               }
           }),
           pg.expense.findMany({
               where: {
                   userId
               }
           }),
           pg.balance.findMany({
               where: {
                   userId
               }
           }),
           pg.transaction.findMany({
               where: {
                   userId
               }
           })
       ]);
       res.json({ incomes, expenses, balance, transactions });
   } catch (error) {
       console.error(error);
       res.status(500).send('Internal Server Error');
   }
})

app.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});

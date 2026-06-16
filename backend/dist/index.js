import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
const app = express();
const pg = new PrismaClient();
const { JWT_SECRET } = process.env;
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
    }
    catch (error) {
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
                if (!JWT_SECRET || typeof JWT_SECRET !== 'string') {
                    return res.status(500).send('JWT secret is not configured');
                }
                const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
                return res.json({ token, username: user.username });
            }
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
    res.status(401).send('Invalid credentials');
});
async function UserMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    let token;
    if (typeof authHeader === 'string') {
        token = authHeader.split(' ')[1];
    }
    if (!token) {
        return res.status(401).send('Access denied');
    }
    try {
        if (!JWT_SECRET || typeof JWT_SECRET !== 'string') {
            return res.status(500).send('JWT secret is not configured');
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        // @ts-ignore
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(403).send('Invalid token');
    }
}
app.post('/senddata', UserMiddleware, async (req, res) => {
    const { type, amount, description, date, category } = req.body;
    const parsedAmount = parseFloat(amount);
    const dateObj = new Date(date);
    const monthName = dateObj.toLocaleString("default", { month: "long" });
    try {
        if (type === "income") {
            await pg.income.create({
                data: {
                    amount: parsedAmount,
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
                    amount: parsedAmount,
                    description,
                    category,
                    date: dateObj.toString(),
                    month: monthName,
                    // @ts-ignore
                    userId: req.user.id
                }
            });
        }
        const [incomes, expenses] = await Promise.all([
            pg.income.findMany({
                // @ts-ignore
                where: { userId: req.user.id, month: monthName }
            }),
            pg.expense.findMany({
                // @ts-ignore
                where: { userId: req.user.id, month: monthName }
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
            update: { amount: netBalance },
            create: {
                // @ts-ignore
                userId: req.user.id,
                month: monthName,
                amount: netBalance
            }
        });
        await pg.transaction.create({
            data: {
                type,
                amount: parsedAmount,
                description,
                date: dateObj.toString(),
                // @ts-ignore
                userId: req.user.id
            }
        });
        res.json({
            message: `${type} created successfully`,
            balance: netBalance
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/getdata', UserMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.user.id;
    const previousMonth = new Date();
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    const currentMonth = new Date().toLocaleString("default", { month: "long" });
    const prevMonth = previousMonth.toLocaleString("default", { month: "long" });
    try {
        const [currentmonthbalance, previousmonthbalance, currentmonthexpense, previousmonthexpense] = await Promise.all([
            pg.balance.findMany({ where: { userId, month: currentMonth } }),
            pg.balance.findMany({ where: { userId, month: prevMonth } }),
            pg.expense.findMany({ where: { userId, month: currentMonth } }),
            pg.expense.findMany({ where: { userId, month: prevMonth } })
        ]);
        const transaction = await pg.transaction.findMany({
            where: { userId }
        });
        res.json({
            currentmonthbalance,
            currentmonthexpense,
            previousmonthbalance,
            previousmonthexpense,
            transaction
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/getChartData', UserMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.user.id;
    try {
        const [incomes, expenses, balance, transactions] = await Promise.all([
            pg.income.findMany({ where: { userId } }),
            pg.expense.findMany({ where: { userId } }),
            pg.balance.findMany({ where: { userId } }),
            pg.transaction.findMany({ where: { userId } })
        ]);
        res.json({ incomes, expenses, balance, transactions });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});
//# sourceMappingURL=index.js.map
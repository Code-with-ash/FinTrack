# FinTrack

A full-stack personal finance tracker built with Next.js and Express. Track your expenses, visualize spending patterns, and take control of your financial life.

## Tech Stack

**Frontend**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Chart.js & Nivo (data visualization)
- GSAP (scroll animations)
- Lucide React (icons)

**Backend**
- Express.js 5
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt (password hashing)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Update the `DATABASE_URL` and `JWT_SECRET` values in `.env`, then run:

```bash
npx prisma migrate dev
npm run dev
```

The API server starts on `http://localhost:8080`.

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file:

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Then run:

```bash
npm run dev
```

The app starts on `http://localhost:3000`.

## Features

- **Secure Authentication** — JWT-based signup and signin with bcrypt password hashing
- **Expense Tracking** — Log income and expenses with categories, dates, and notes
- **Dashboard Analytics** — Real-time balance and expense tracking with month-over-month comparisons
- **Interactive Charts** — Line charts for balance vs expenses, pie charts for category breakdown
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Smooth Animations** — Scroll-triggered animations powered by GSAP

## Project Structure

```
FinTrack/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   └── index.ts
│   └── package.json
├── frontend/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── signin/
│   │   │   └── signup/
│   │   ├── dashboard/
│   │   │   └── [username]/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   └── package.json
├── .gitignore
└── README.md
```

## License

This project is for educational and personal use.

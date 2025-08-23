/*
  Warnings:

  - A unique constraint covering the columns `[userId,month,year]` on the table `Balance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Balance_userId_month_year_key" ON "public"."Balance"("userId", "month", "year");

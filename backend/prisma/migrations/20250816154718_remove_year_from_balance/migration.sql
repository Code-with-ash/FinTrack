/*
  Warnings:

  - You are about to drop the column `year` on the `Balance` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,month]` on the table `Balance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Balance_userId_month_year_key";

-- AlterTable
ALTER TABLE "public"."Balance" DROP COLUMN "year";

-- CreateIndex
CREATE UNIQUE INDEX "Balance_userId_month_key" ON "public"."Balance"("userId", "month");

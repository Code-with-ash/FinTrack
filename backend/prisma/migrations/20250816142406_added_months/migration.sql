/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Balance` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Balance` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Balance` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `Balance` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `month` to the `Balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Balance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Income` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Income` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Balance" DROP COLUMN "createdAt",
DROP COLUMN "description",
DROP COLUMN "type",
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "public"."Expense" ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "month" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Income" ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "month" TEXT NOT NULL;

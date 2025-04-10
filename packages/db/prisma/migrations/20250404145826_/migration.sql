/*
  Warnings:

  - You are about to drop the column `wonById` on the `Game` table. All the data in the column will be lost.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "GameResult" ADD VALUE 'NOT_STARTED';
ALTER TYPE "GameResult" ADD VALUE 'WHITE_WON';
ALTER TYPE "GameResult" ADD VALUE 'BLACK_WON';

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_wonById_fkey";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "wonById",
ALTER COLUMN "result" SET DEFAULT 'NOT_STARTED';

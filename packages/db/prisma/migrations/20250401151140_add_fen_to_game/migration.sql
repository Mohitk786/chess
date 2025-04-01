/*
  Warnings:

  - Added the required column `fen` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerId` to the `Move` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "fen" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Move" ADD COLUMN     "playerId" INTEGER NOT NULL;

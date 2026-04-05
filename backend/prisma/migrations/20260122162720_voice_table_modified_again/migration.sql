/*
  Warnings:

  - You are about to drop the column `voice` on the `Voice` table. All the data in the column will be lost.
  - Added the required column `name` to the `Voice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Voice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Voice" DROP COLUMN "voice",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;

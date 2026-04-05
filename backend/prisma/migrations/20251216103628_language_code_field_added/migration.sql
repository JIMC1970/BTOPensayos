/*
  Warnings:

  - Added the required column `language_code` to the `Voice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Voice" ADD COLUMN     "language_code" TEXT NOT NULL;

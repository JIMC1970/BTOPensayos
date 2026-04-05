/*
  Warnings:

  - You are about to drop the column `music` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `photos` on the `Template` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Template" DROP COLUMN "music",
DROP COLUMN "photos",
ADD COLUMN     "emotional_state" TEXT NOT NULL DEFAULT 'none';

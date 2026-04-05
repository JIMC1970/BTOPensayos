/*
  Warnings:

  - You are about to drop the column `voiceprompt` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the `TextParams` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."TextParams" DROP CONSTRAINT "TextParams_templateId_fkey";

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "voiceprompt",
ADD COLUMN     "textprompt" TEXT;

-- DropTable
DROP TABLE "public"."TextParams";

-- CreateTable
CREATE TABLE "VoiceParams" (
    "id" SERIAL NOT NULL,
    "templateId" INTEGER NOT NULL,
    "speakingRate" DOUBLE PRECISION DEFAULT 1.0,
    "pitch" INTEGER DEFAULT 0,
    "volumeGainDb" INTEGER DEFAULT 0,
    "sampleRateHertz" INTEGER DEFAULT 16000,

    CONSTRAINT "VoiceParams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VoiceParams_templateId_key" ON "VoiceParams"("templateId");

-- AddForeignKey
ALTER TABLE "VoiceParams" ADD CONSTRAINT "VoiceParams_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

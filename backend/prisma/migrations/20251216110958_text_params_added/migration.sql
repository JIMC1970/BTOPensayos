/*
  Warnings:

  - You are about to drop the column `textprompt` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `language_code` on the `Voice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Template" DROP COLUMN "textprompt";

-- AlterTable
ALTER TABLE "Voice" DROP COLUMN "language_code",
ADD COLUMN     "languageCode" TEXT NOT NULL DEFAULT 'es-ES';

-- CreateTable
CREATE TABLE "TextParams" (
    "id" SERIAL NOT NULL,
    "templateId" INTEGER NOT NULL,
    "speakingRate" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "pitch" INTEGER NOT NULL DEFAULT 0,
    "volumeGainDb" INTEGER NOT NULL DEFAULT 0,
    "sampleRateHertz" INTEGER NOT NULL DEFAULT 16000,

    CONSTRAINT "TextParams_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TextParams_templateId_key" ON "TextParams"("templateId");

-- AddForeignKey
ALTER TABLE "TextParams" ADD CONSTRAINT "TextParams_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

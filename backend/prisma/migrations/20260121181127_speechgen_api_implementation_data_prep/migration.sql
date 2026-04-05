/*
  Warnings:

  - You are about to drop the column `genre` on the `Voice` table. All the data in the column will be lost.
  - You are about to drop the column `languageCode` on the `Voice` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Voice` table. All the data in the column will be lost.
  - You are about to drop the column `plan` on the `Voice` table. All the data in the column will be lost.
  - You are about to drop the column `preview` on the `Voice` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Voice` table. All the data in the column will be lost.
  - You are about to drop the column `sampleRateHertz` on the `VoiceParams` table. All the data in the column will be lost.
  - You are about to drop the column `speakingRate` on the `VoiceParams` table. All the data in the column will be lost.
  - You are about to drop the column `volumeGainDb` on the `VoiceParams` table. All the data in the column will be lost.
  - Added the required column `gender` to the `Voice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voice` to the `Voice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Voice" DROP COLUMN "genre",
DROP COLUMN "languageCode",
DROP COLUMN "name",
DROP COLUMN "plan",
DROP COLUMN "preview",
DROP COLUMN "value",
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "voice" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VoiceParams" DROP COLUMN "sampleRateHertz",
DROP COLUMN "speakingRate",
DROP COLUMN "volumeGainDb",
ADD COLUMN     "bitrate" INTEGER DEFAULT 48000,
ADD COLUMN     "emotion" TEXT NOT NULL DEFAULT 'neutral',
ADD COLUMN     "pause_paragraph" INTEGER NOT NULL DEFAULT 400,
ADD COLUMN     "pause_sentence" INTEGER NOT NULL DEFAULT 300,
ADD COLUMN     "speed" DOUBLE PRECISION DEFAULT 1.0,
ALTER COLUMN "pitch" SET DEFAULT 1.0,
ALTER COLUMN "pitch" SET DATA TYPE DOUBLE PRECISION;

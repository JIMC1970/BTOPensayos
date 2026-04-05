-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "templateId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "placeholder" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "h1" TEXT NOT NULL,
    "h2" TEXT,
    "h3" TEXT,
    "description" TEXT,
    "photos" TEXT[],
    "textprompt" TEXT NOT NULL,
    "voiceprompt" TEXT NOT NULL,
    "music" TEXT[],
    "published" BOOLEAN NOT NULL DEFAULT false,
    "tag" TEXT,
    "popularity" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "promo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

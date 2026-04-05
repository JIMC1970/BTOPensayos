-- CreateTable
CREATE TABLE "Voice" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "genre" TEXT NOT NULL,

    CONSTRAINT "Voice_pkey" PRIMARY KEY ("id")
);

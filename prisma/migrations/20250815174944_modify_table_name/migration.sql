/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."Player" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "timeTaken" INTEGER,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_username_key" ON "public"."Player"("username");

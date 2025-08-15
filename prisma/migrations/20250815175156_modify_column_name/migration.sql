/*
  Warnings:

  - You are about to drop the column `username` on the `Player` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Player_username_key";

-- AlterTable
ALTER TABLE "public"."Player" DROP COLUMN "username",
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_key" ON "public"."Player"("name");

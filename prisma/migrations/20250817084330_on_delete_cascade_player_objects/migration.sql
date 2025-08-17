-- DropForeignKey
ALTER TABLE "public"."PlayerObject" DROP CONSTRAINT "PlayerObject_objectId_fkey";

-- DropForeignKey
ALTER TABLE "public"."PlayerObject" DROP CONSTRAINT "PlayerObject_playerId_fkey";

-- AddForeignKey
ALTER TABLE "public"."PlayerObject" ADD CONSTRAINT "PlayerObject_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlayerObject" ADD CONSTRAINT "PlayerObject_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "public"."Object"("id") ON DELETE CASCADE ON UPDATE CASCADE;

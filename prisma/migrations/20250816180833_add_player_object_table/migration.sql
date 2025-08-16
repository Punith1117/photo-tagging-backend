-- CreateTable
CREATE TABLE "public"."PlayerObject" (
    "playerId" INTEGER NOT NULL,
    "objectId" INTEGER NOT NULL,
    "found" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PlayerObject_pkey" PRIMARY KEY ("playerId","objectId")
);

-- AddForeignKey
ALTER TABLE "public"."PlayerObject" ADD CONSTRAINT "PlayerObject_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "public"."Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PlayerObject" ADD CONSTRAINT "PlayerObject_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "public"."Object"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

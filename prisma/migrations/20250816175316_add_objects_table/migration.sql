-- CreateTable
CREATE TABLE "public"."Object" (
    "id" INTEGER NOT NULL,
    "startX" DECIMAL(4,2) NOT NULL,
    "endX" DECIMAL(4,2) NOT NULL,
    "startY" DECIMAL(4,2) NOT NULL,
    "endY" DECIMAL(4,2) NOT NULL,

    CONSTRAINT "Object_pkey" PRIMARY KEY ("id")
);

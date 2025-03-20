/*
  Warnings:

  - You are about to drop the column `chargingStation` on the `ChargingRecord` table. All the data in the column will be lost.
  - Added the required column `chargingStationId` to the `ChargingRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChargingRecord" DROP COLUMN "chargingStation",
ADD COLUMN     "chargingStationId" INTEGER NOT NULL,
ALTER COLUMN "rangeBeforeCharging" DROP NOT NULL,
ALTER COLUMN "rangeAfterCharging" DROP NOT NULL,
ALTER COLUMN "socBeforeCharging" DROP NOT NULL,
ALTER COLUMN "socAfterCharging" DROP NOT NULL,
ALTER COLUMN "totalMileage" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ChargingStation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ChargingStation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChargingStation_name_key" ON "ChargingStation"("name");

-- AddForeignKey
ALTER TABLE "ChargingRecord" ADD CONSTRAINT "ChargingRecord_chargingStationId_fkey" FOREIGN KEY ("chargingStationId") REFERENCES "ChargingStation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

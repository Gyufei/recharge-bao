-- CreateTable
CREATE TABLE "ChargingRecord" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "chargingCost" DOUBLE PRECISION NOT NULL,
    "chargingKWh" DOUBLE PRECISION NOT NULL,
    "rangeBeforeCharging" DOUBLE PRECISION NOT NULL,
    "rangeAfterCharging" DOUBLE PRECISION NOT NULL,
    "socBeforeCharging" DOUBLE PRECISION NOT NULL,
    "socAfterCharging" DOUBLE PRECISION NOT NULL,
    "totalMileage" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,
    "chargingStation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChargingRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChargingRecord" ADD CONSTRAINT "ChargingRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

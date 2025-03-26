import { prisma } from '@/lib/prisma';
import { checkAuth } from '../help/check-auth';

export async function GET() {
  const { userId, authErrorResponse } = await checkAuth();

  if (!userId) {
    return authErrorResponse;
  }

  const chargingRecords = await prisma.chargingRecord.findMany({
    where: {
      userId: userId,
    },
    include: {
      chargingStation: true,
    },
    orderBy: {
      date: 'desc',
    },
  });

  return Response.json(chargingRecords);
}

export async function POST(request: Request) {
  const { userId, authErrorResponse } = await checkAuth();

  if (!userId) {
    return authErrorResponse;
  }

  const {
    date,
    chargingCost,
    chargingKWh,
    rangeBeforeCharging,
    rangeAfterCharging,
    socBeforeCharging,
    socAfterCharging,
    totalMileage,
    chargingStationId,
  } = await request.json();

  await prisma.chargingRecord.create({
    data: {
      date,
      chargingCost,
      chargingKWh,
      rangeBeforeCharging,
      rangeAfterCharging,
      socBeforeCharging,
      socAfterCharging,
      totalMileage,
      userId,
      chargingStationId,
    },
  });

  return Response.json({
    message: '添加成功',
    success: true,
  });
}

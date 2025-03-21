import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { checkAuth } from '../help/check-auth';

export async function GET(request: Request) {
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

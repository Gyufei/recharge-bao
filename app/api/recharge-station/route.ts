import { prisma } from '@/lib/prisma';
import { checkAuth } from '../help/check-auth';

export async function GET() {
  const { userId, authErrorResponse } = await checkAuth();

  if (!userId) {
    return authErrorResponse;
  }

  const chargingStations = await prisma.chargingStation.findMany({});

  return Response.json(chargingStations);
}

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { IApiResponse, IChargingStation } from '@/lib/types/common';
import { authErrorResponse, NextAuthRequest } from '../help/helper';

export const GET = auth(async function GET(request: NextAuthRequest) {
  if (!request.auth) {
    return authErrorResponse();
  }

  const chargingStations = (await prisma.chargingStation.findMany({})) as IChargingStation[];

  return Response.json({
    data: chargingStations,
    success: true,
  } as IApiResponse<IChargingStation[]>);
});

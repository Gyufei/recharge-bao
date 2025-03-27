import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { authErrorResponse, NextAuthRequest } from '../help/helper';
import { IApiResponse, IChargePriceChartItem } from '@/lib/types/common';

export const GET = auth(async function GET(request: NextAuthRequest) {
  try {
    if (!request.auth) {
      return authErrorResponse();
    }

    const session = await auth();
    const userId = session?.user?.id;

    const data = (await prisma.chargingRecord.findMany({
      where: {
        userId: userId,
      },
      select: {
        chargingCost: true,
        chargingKWh: true,
        totalMileage: true,
        date: true,
      },
      orderBy: {
        date: 'asc',
      },
    })) as IChargePriceChartItem[];

    return Response.json({
      data: data,
      success: true,
    } as IApiResponse<IChargePriceChartItem[]>);
  } catch (error) {
    console.error('获取充电统计失败:', error);

    return Response.json(
      {
        message: '获取充电统计失败',
        success: false,
      },
      { status: 500 }
    );
  }
});

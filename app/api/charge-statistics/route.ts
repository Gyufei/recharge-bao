import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { authErrorResponse, NextAuthRequest } from '../help/helper';
import { IApiResponse, IChargeStatistics } from '@/lib/types/common';

export const GET = auth(async function GET(request: NextAuthRequest) {
  try {
    if (!request.auth) {
      return authErrorResponse();
    }

    const session = await auth();
    const userId = session?.user?.id;

    const data = await prisma.chargingRecord.aggregate({
      where: {
        userId: userId,
      },
      _sum: {
        chargingCost: true,
        chargingKWh: true,
      },
      _count: true,
      _min: {
        date: true,
      },
      _max: {
        date: true,
        totalMileage: true,
      },
    });

    const resp: IChargeStatistics = {
      totalCost: data._sum.chargingCost,
      totalKwh: data._sum.chargingKWh,
      totalMileage: data._max.totalMileage,
      totalCount: data._count,
      minDate: data._min.date,
      maxDate: data._max.date,
    };

    return Response.json({
      data: resp,
      success: true,
    } as IApiResponse<IChargeStatistics>);
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

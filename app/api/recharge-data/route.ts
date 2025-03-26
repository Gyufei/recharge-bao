import { prisma } from '@/lib/prisma';
import { checkAuth } from '../help/check-auth';
import { rechargeSchema } from '@/lib/types/data-model';
import { z } from 'zod';

export async function GET() {
  try {
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

    return Response.json({
      data: chargingRecords,
      success: true,
    });
  } catch (error) {
    console.error('获取充电记录失败:', error);
    
    return Response.json(
      {
        message: '获取充电记录失败',
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { userId, authErrorResponse } = await checkAuth();

  if (!userId) {
    return authErrorResponse;
  }

  try {
    const body = await request.json();
    const validatedData = rechargeSchema.parse(body);

    await prisma.chargingRecord.create({
      data: {
        ...validatedData,
        date: new Date(validatedData.date),
        userId,
      },
    });

    return Response.json({
      message: '添加成功',
      success: true,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        {
          message: '数据验证失败',
          errors: error.errors,
          success: false,
        },
        { status: 400 }
      );
    }

    console.error('创建充电记录失败:', error);
    return Response.json(
      {
        message: '添加失败',
        success: false,
      },
      { status: 500 }
    );
  }
}

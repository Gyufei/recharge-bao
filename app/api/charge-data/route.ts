import { z } from 'zod';
import { auth } from '@/auth';

import { prisma } from '@/lib/prisma';
import { IApiResponse, IChargeRecord, IPaginationInfo } from '@/lib/types/common';
import { chargeSchema } from '@/lib/types/schema';
import { authErrorResponse, NextAuthRequest } from '../help/helper';

export const GET = auth(async function GET(request: NextAuthRequest) {
  try {
    if (!request.auth) {
      return authErrorResponse();
    }

    const session = await auth();
    const userId = session?.user?.id;

    // 从 URL 参数中获取分页信息
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    // 计算 skip 值
    const skip = (page - 1) * pageSize;

    // 获取总记录数
    const total = await prisma.chargingRecord.count({
      where: {
        userId: userId,
      },
    });

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
      skip,
      take: pageSize,
    }) as IChargeRecord[];

    return Response.json({
      data: chargingRecords,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      } as IPaginationInfo,
      success: true,
    } as IApiResponse<IChargeRecord[]>);
  } catch (error) {
    console.error('获取充电记录失败:', error);

    return Response.json(
      {
        data: null,
        message: '获取充电记录失败',
        success: false,
      },
      { status: 500 }
    );
  }
});

export const POST = auth(async function POST(request: NextAuthRequest) {
  if (!request.auth) {
    return authErrorResponse();
  }

  const session = await auth();
  const userId = session?.user?.id;

  try {
    const body = await request.json();
    const validatedData = chargeSchema.parse(body);

    await prisma.chargingRecord.create({
      data: {
        ...validatedData,
        date: new Date(validatedData.date),
        userId: userId!,
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
});

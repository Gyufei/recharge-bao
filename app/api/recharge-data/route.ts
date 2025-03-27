import { prisma } from '@/lib/prisma';
import { checkAuth } from '../help/check-auth';
import { rechargeSchema } from '@/lib/types/data-model';
import { z } from 'zod';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { userId, authErrorResponse } = await checkAuth();

    if (!userId) {
      return authErrorResponse;
    }

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
    });

    return Response.json({
      data: chargingRecords,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
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

import { IApiResponse } from '@/lib/types/common';
import { Session } from 'next-auth';
import { NextRequest } from 'next/server';

export function authErrorResponse() {
  return Response.json(
    {
      success: false,
      message: 'Not authorized',
      data: null,
    } as IApiResponse<null>,
    { status: 401 }
  );
}

export interface NextAuthRequest extends NextRequest {
  auth: Session | null;
}

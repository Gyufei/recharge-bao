import { auth } from '@/auth';

export async function checkAuth() {
  const session = await auth();
  const userId = session?.user?.id;

  return {
    userId,
    authErrorResponse: Response.json(
      {
        success: false,
        message: 'No user id',
        data: null,
      },
      { status: 401 }
    ),
  };
}

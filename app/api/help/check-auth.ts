import { auth } from '@/auth';

export async function checkAuth() {
  const session = await auth();
  const userId = session?.user?.id;

  return {
    userId,
    authErrorResponse: Response.json({ error: 'No user id' }, { status: 401 }),
  };
}

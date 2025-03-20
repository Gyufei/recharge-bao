import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const session = await auth();
  const userId = session?.user?.id;

  console.log('session', session);
  console.log('userId', userId);

  if (!userId) {
    return Response.json({ error: 'No user id' }, { status: 401 });
  }

  const chargingRecords = await prisma.chargingRecord.findMany({
    where: {
      userId: userId,
    },
  });

  return Response.json(chargingRecords);
}

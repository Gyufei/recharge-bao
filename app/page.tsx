import { auth } from '@/auth';
import { SignIn } from '@/lib/components/sign-in';

export default async function Home() {
  const session = await auth();

  if (!session) {
    return <SignIn />;
  }

  return <div>Begin</div>;
}

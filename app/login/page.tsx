import Image from 'next/image';
import { auth, signIn } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Login() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm flex items-center flex-col justify-center w-full text-gray-600 space-y-5">
        <Image src="/icons/logo.svg" height={150} width={150} alt="logo" className="mx-auto rounded-full" />
        <form
          action={async () => {
            'use server';
            await signIn('google');
          }}
        >
          <button type="submit" className="btn btn-success">
            <span>使用</span>
            <Image src="/icons/google.svg" width={20} height={20} alt="google" />
            <span>登录</span>
          </button>
        </form>
      </div>
    </main>
  );
}

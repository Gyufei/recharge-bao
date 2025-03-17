'use client';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export function SignIn() {
  async function handleSignIn() {
    try {
      await signIn('google');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center px-4">
      <div className="max-w-sm flex items-center flex-col justify-center w-full text-gray-600 space-y-5">
        <img src="/icons/logo.svg" width={150} className="mx-auto rounded-full" />
        <button type="submit" className="btn btn-success" onClick={handleSignIn}>
          <span>使用</span>
          <Image src="/icons/google.svg" width={20} height={20} alt="google" />
          <span>登录</span>
        </button>
      </div>
    </main>
  );
}

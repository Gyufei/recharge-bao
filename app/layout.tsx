import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import './globals.css';
import { QueryClientWrapProvider } from '@/lib/providers/query-client-wrap';
import { ToastProvider } from '@/lib/components/toast-provider';

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'RechargeBao',
  description: 'Car charging record',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable}`}>
        <ToastProvider>
          <QueryClientWrapProvider>{children}</QueryClientWrapProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

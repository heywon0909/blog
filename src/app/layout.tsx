import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import './globals.css';

import Header from '@/components/Header';

const notoSans = Noto_Sans({
  weight: '400',
});

export const metadata: Metadata = {
  title: {
    default: 'heywon0909의 블로그',
    template: 'heywon0909의 블로그 | %s',
  },
  description: '프론트엔드 엔지니어 heywon0909의 블로그',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.className} flex flex-col mx-auto`}>
        <Header />
        <main className="grow lg:mx-auto lg:w-3/5">{children}</main>
      </body>
    </html>
  );
}

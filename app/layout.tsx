import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "pictomo",
  description: `
  pictomo / ピクトモ / ぴくとも
  自己紹介、ポートフォリオサイトです。ITエンジニアの卵をやっております。
  This is self-introduction and portfolio site. I'm an aspiring IT engineer.
  `,
  keywords: [
    "pictomo",
    "ピクトモ",
    "ぴくとも",
    "self introduction",
    "自己紹介",
    "portfolio",
    "ポートフォリオ",
    "IT engineer",
    "ITエンジニア",
    "Japan",
    "日本",
  ],
  icons: "/favicon.ico",
  verification: {
    google: "UcpS98FWCatzamy3CSYV17WDqJdIusn5PK0j9mp0qbc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

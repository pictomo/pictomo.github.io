import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "pictomo",
  description: `
  pictomo / ピクトモ / ぴくとも
  pictomoの自己紹介、ポートフォリオサイトです。ITエンジニアの卵をやっております。
  This is pictomo's self-introduction and portfolio site. I'm an aspiring IT engineer.
  `,
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

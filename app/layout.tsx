import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.scss";
import { ThemeProvider } from "next-themes";
import P5 from "./components/p5";

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
  icons: {
    icon: [
      { url: "/icon0.svg", type: "image/svg+xml" },
      { url: "/icon1.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <P5 />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

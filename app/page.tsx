"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Home from "./components/home";
import { defaultLocale } from "./i18n/config";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/ja");
  }, []);

  return (
    <noscript>
      <Home locale={defaultLocale} />
    </noscript>
  );
};

export default Page;

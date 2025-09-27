"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Home from "@/app/[locale]/home";
import { defaultLocale, I18nLocale, i18nLocales } from "./i18n/config";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const detectedLocale = window.navigator.language;
    // const detectedLocale = "hoge";
    if (i18nLocales.includes(detectedLocale as I18nLocale)) {
      router.replace("/" + detectedLocale);
    } else {
      router.replace("/" + defaultLocale);
    }
  }, []);

  return (
    <noscript>
      <Home locale={defaultLocale} />
    </noscript>
  );
};

export default Page;

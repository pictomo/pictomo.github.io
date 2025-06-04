"use client";

import { useState } from "react";

import Home from "@/app/components/home";
import { I18nLocale, defaultLocale } from "@/app/i18n/config";
import { I18nLocaleContext } from "@/app/i18n_locale_context";

const Page = () => {
  const [i18nLocale, setI18nLocale] = useState<I18nLocale>(defaultLocale);

  return (
    <I18nLocaleContext.Provider
      value={{ locale: i18nLocale, setLocale: setI18nLocale }}
    >
      <Home />
    </I18nLocaleContext.Provider>
  );
};

export default Page;

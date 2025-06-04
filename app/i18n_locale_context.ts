import { createContext, Dispatch, SetStateAction } from "react";

import { I18nLocale, defaultLocale } from "@/app/i18n/config";

export const I18nLocaleContext = createContext<{
  locale: I18nLocale;
  setLocale: Dispatch<SetStateAction<I18nLocale>>;
}>({ locale: defaultLocale, setLocale: () => {} });

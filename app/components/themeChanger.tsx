"use client";

import { useTheme } from "next-themes";
import { I18nLocale, t } from "@/app/i18n/config";
import linkStyles from "@/app/styles/link.module.scss";
import { useEffect, useState } from "react";

export const ThemeChanger = ({ locale }: { locale: I18nLocale }) => {
  const { theme, setTheme } = useTheme();

  // 直接themeを参照するとbuildされたものと食い違いHydration Errorとなる
  // themeAfterHydrationをクッションとして用いる
  const [themeAfterHydration, setThemeAfterHydration] = useState<
    string | undefined
  >();

  useEffect(() => {
    setThemeAfterHydration(theme);
  }, []);

  return (
    <div>
      <span
        className={linkStyles.link}
        onClick={() => {
          setTheme(theme === "light" ? "dark" : "light");
          setThemeAfterHydration(theme === "light" ? "dark" : "light");
        }}
      >
        {t(
          {
            ja:
              themeAfterHydration === "dark" ? "ライトモード" : "ダークモード",
            en: themeAfterHydration === "dark" ? "Light Mode" : "Dark Mode",
          },
          locale
        )}
      </span>
    </div>
  );
};

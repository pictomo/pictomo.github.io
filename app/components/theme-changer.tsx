"use client";

import { useTheme } from "next-themes";
import { I18nLocale, t } from "@/app/i18n/config";
import linkStyles from "@/app/styles/link.module.scss";

const ThemeChanger = ({ locale }: { locale: I18nLocale }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div
      className={linkStyles.link}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {t(
        {
          ja: resolvedTheme === "dark" ? "ライトモード" : "ダークモード",
          en: resolvedTheme === "dark" ? "Light Mode" : "Dark Mode",
        },
        locale
      )}
    </div>
  );
};

export default ThemeChanger;

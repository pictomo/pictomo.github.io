"use client";

import { useTheme } from "next-themes";
import { I18nLocale, t } from "@/app/i18n/config";
import linkStyles from "@/app/styles/link.module.scss";
import MountContainer from "./mount-container";

const ThemeChanger = ({ locale }: { locale: I18nLocale }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  return (
    <div>
      <span
        className={linkStyles.link}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <MountContainer
          defaultContent={t(
            {
              ja: "カラーモード",
              en: "Color Mode",
            },
            locale
          )}
        >
          {t(
            {
              ja: resolvedTheme === "dark" ? "ライトモード" : "ダークモード",
              en: resolvedTheme === "dark" ? "Light Mode" : "Dark Mode",
            },
            locale
          )}
        </MountContainer>
      </span>
    </div>
  );
};

export default ThemeChanger;

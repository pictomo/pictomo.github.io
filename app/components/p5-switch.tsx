"use client";

import { useP5Store } from "./p5-container";
import { I18nLocale, t } from "@/app/i18n/config";
import { FiInfo } from "react-icons/fi";
import linkStyles from "@/app/styles/link.module.scss";
import iconStyles from "@/app/styles/icon.module.scss";
import tooltipStyles from "@/app/styles/tooltip.module.scss";

const P5Switch = ({ locale }: { locale: I18nLocale }) => {
  const { showP5, showConnections, setShowP5, setShowConnections } =
    useP5Store();

  const toggleMode = () => {
    if (showP5 && showConnections) {
      // 通常 → エッジなし
      setShowConnections(false);
    } else if (showP5 && !showConnections) {
      // エッジなし → オフ
      setShowP5(false);
    } else {
      // オフ → 通常
      setShowP5(true);
      setShowConnections(true);
    }
  };

  return (
    <div>
      <span className={linkStyles.link} onClick={toggleMode}>
        {t({ ja: "背景モード", en: "Background Mode" }, locale)}
      </span>
      <span className={tooltipStyles.container}>
        <FiInfo className={`${iconStyles.adjust} ${iconStyles.leftMargin}`} />
        <span className={tooltipStyles.text}>
          {t(
            {
              ja: "パフォーマンスが悪い場合はoffにしてください",
              en: "Please turn it off if it performs poorly",
            },
            locale
          )}
        </span>
      </span>
    </div>
  );
};

export default P5Switch;

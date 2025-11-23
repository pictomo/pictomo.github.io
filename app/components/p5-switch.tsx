"use client";

import { useP5Store } from "./p5-container";
import { I18nLocale, t } from "@/app/i18n/config";
import linkStyles from "@/app/styles/link.module.scss";
import MountContainer from "./mount-container";

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
        <MountContainer
          defaultContent={t(
            { ja: "背景モード", en: "Background Mode" },
            locale
          )}
        >
          {t({ ja: "背景モード", en: "Background Mode" }, locale)}
        </MountContainer>
      </span>
    </div>
  );
};

export default P5Switch;

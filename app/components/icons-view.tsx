"use client";

import { useEffect, useState } from "react";
import ImgStyle from "@/app/styles/img.module.scss";
import layeringStyle from "@/app/styles/layering.module.scss";
import style from "./icons-view.module.scss";
import { QRCodeSVG } from "qrcode.react";
import { useTheme } from "next-themes";
import ThemeContainer from "./theme-container";

const defaultURL = "https://pictomo.github.io";

const IconsView = () => {
  const [qr, setQr] = useState(false);
  const [url, setUrl] = useState(defaultURL);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setUrl(window?.location.origin || defaultURL);
  }, []);

  return (
    <div
      className={`${layeringStyle.origin} ${style.artsOrigin}`}
      onClick={() => setQr(!qr)}
    >
      <ThemeContainer
        defaultContent={
          <>
            <img
              src="/favicon-high-quality.jpg"
              alt="favicon"
              className={`${ImgStyle.pixelArt} ${layeringStyle.layer} ${
                qr ? layeringStyle.first : layeringStyle.third
              } ${style.art1}`}
            />
            <QRCodeSVG
              value={url}
              size={256}
              bgColor="#ffffff"
              fgColor="#000000"
              marginSize={2}
              className={`${layeringStyle.layer} ${layeringStyle.second} ${style.art2}`}
            />
          </>
        }
      >
        <img
          src={
            resolvedTheme === "dark"
              ? "/favicon-dark.ico"
              : "/favicon-high-quality.jpg"
          }
          alt="favicon"
          className={`${ImgStyle.pixelArt} ${layeringStyle.layer} ${
            qr ? layeringStyle.first : layeringStyle.third
          } ${style.art1}`}
        />
        <QRCodeSVG
          value={url}
          size={256}
          bgColor={resolvedTheme === "dark" ? "#000000" : "#ffffff"}
          fgColor={resolvedTheme === "dark" ? "#ffffff" : "#000000"}
          marginSize={2}
          className={`${layeringStyle.layer} ${layeringStyle.second} ${style.art2}`}
        />
      </ThemeContainer>
    </div>
  );
};

export default IconsView;

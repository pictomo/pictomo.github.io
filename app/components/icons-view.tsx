"use client";

import { useState, useEffect } from "react";
import ImgStyle from "@/app/styles/img.module.scss";
import layeringStyle from "@/app/styles/layering.module.scss";
import style from "./icons-view.module.scss";
import { QRCodeSVG } from "qrcode.react";
import { useTheme } from "next-themes";

const IconsView = () => {
  const [qr, setQr] = useState(false);
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={`${layeringStyle.origin} ${style.artsOrigin}`}
      onClick={() => setQr(!qr)}
    >
      <img
        src="/favicon.ico"
        alt="favicon"
        className={`${ImgStyle.pixelArt} ${layeringStyle.layer} ${
          qr ? layeringStyle.first : layeringStyle.third
        } ${style.art1}`}
      />
      <QRCodeSVG
        value={window.location.origin}
        size={256}
        bgColor={resolvedTheme === "dark" ? "#000000" : "#ffffff"}
        fgColor={resolvedTheme === "dark" ? "#ffffff" : "#000000"}
        marginSize={2}
        className={`${layeringStyle.layer} ${layeringStyle.second} ${style.art2}`}
      />
    </div>
  );
};

export default IconsView;

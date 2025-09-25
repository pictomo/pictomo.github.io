"use client";

import { useState } from "react";
import ImgStyle from "@/app/styles/img.module.scss";
import layeringStyle from "@/app/styles/layering.module.scss";
import style from "./iconsView.module.scss";

export const IconsView = () => {
  const [qr, setQr] = useState(false);

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
      <img
        src="/qr_pictomo.github.io.png"
        alt="favicon"
        className={`${layeringStyle.layer} ${layeringStyle.second} ${style.art2}`}
      />
    </div>
  );
};

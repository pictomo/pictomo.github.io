"use client";

import { I18nLocale } from "../i18n/config";
import { t } from "../i18n/config";
import Link from "next/link";
// import Script from "next/script";

export const Crowd4UBanner = ({ locale }: { locale: I18nLocale }) => {
  return (
    <div>
      {/* <Script>
        {`
          const userAgent = window.navigator.userAgent.toLowerCase();

          if (typeof crowd4u_task_loaded === 'undefined' || crowd4u_task_loaded !== true) {
            if (userAgent.indexOf('msie') === -1 || userAgent.indexOf('msie 8.') !== -1 || userAgent.indexOf('msie 9.') !== -1 || userAgent.indexOf('msie 10.') !== -1) {
              crowd4u_task_loaded = true;
            
              // オプションとしてrequireを設定
              require = { urlArgs: "requester=2308&length=10&_cache=${Math.floor(
                Date.now() / 1000
              )}" };
              
              const script1 = document.createElement('script');
              script1.type = 'text/javascript';
              script1.src = '//crowd4u.org/js/api/require-jquery.js';
              script1.setAttribute('data-main', '//crowd4u.org/js/api/include.js');
              
              const div = document.createElement('div');
              div.id = 'crowd4u-task-content';
              div.title = '';
              
              document.body.appendChild(script1);
              document.body.appendChild(div);
            }
          }
        `}
      </Script> */}
      <a className="microtask repeat" href="//crowd4u.org" target="_blank">
        {t(
          {
            ja: <img src="//crowd4u.org/img/crowd4u_banner364x93.png" />,
            en: <img src="//crowd4u.org/img/crowd4u_banner364x93_en.png" />,
          },
          locale
        )}
      </a>
    </div>
  );
};

"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Script from "next/script";

export const Crowd4UBanner = () => {
  useEffect(() => {
    // if (document.querySelector("#crowd4u-script")) return;
    // const script = document.createElement("script");
    // script.type = "text/javascript";
    // // script.src = "//crowd4u.org/script/task_loader.js?requester=2308&length=10"; // 参照先スクリプトが悪さしている
    // script.innerHTML = `
    // const userAgent = window.navigator.userAgent.toLowerCase();
    // if (typeof crowd4u_task_loaded === 'undefined' || crowd4u_task_loaded !== true) {
    //   if (userAgent.indexOf('msie') === -1 || userAgent.indexOf('msie 8.') !== -1 || userAgent.indexOf('msie 9.') !== -1 || userAgent.indexOf('msie 10.') !== -1) {
    //     crowd4u_task_loaded = true;
    //     // オプションとしてrequireを設定
    //     require = { urlArgs: "requester=2308&length=10&_cache=${Math.floor(
    //       Date.now() / 1000
    //     )}" };
    //     const script1 = document.createElement('script');
    //     script1.type = 'text/javascript';
    //     script1.src = '//crowd4u.org/js/api/require-jquery.js';
    //     script1.setAttribute('data-main', '//crowd4u.org/js/api/include.js');
    //     const div = document.createElement('div');
    //     div.id = 'crowd4u-task-content';
    //     div.title = '';
    //     document.body.appendChild(script1);
    //     document.body.appendChild(div);
    //   }
    // }
    // `;
    // script.id = "crowd4u-script";
    // script.async = true;
    // document.body.append(script);
  }, []);

  return (
    <div>
      <Script>
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
      </Script>
      <Link className="microtask repeat" href="//crowd4u.org">
        <img src="//crowd4u.org/img/crowd4u_banner364x93.png" />
      </Link>
    </div>
  );
};

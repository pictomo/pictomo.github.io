import Link from "next/link";

import { I18nLocale, t } from "@/app/i18n/config";
import { FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
// import { SiQiita } from "react-icons/si";
import LinkStyle from "@/app/styles/link.module.scss";
import QiitaLogoStyle from "@/app/styles/qiitaLogo.module.scss";
import ImgStyle from "@/app/styles/img.module.scss";
import { SiBookmeter, SiKeybase } from "react-icons/si";
import { BsBookFill } from "react-icons/bs";
import { ThemeChanger } from "./themeChanger";

const Home = ({ locale }: { locale: I18nLocale }) => {
  return (
    <div>
      <h1>Hello, This is Pictomo!</h1>
      <div>
        <img
          src="/favicon.ico"
          alt="favicon"
          width="256"
          className={ImgStyle.pixelArt}
        />
      </div>
      <br />
      <Link className={LinkStyle.link} href={locale === "ja" ? "/en" : "/ja"}>
        {t({ ja: "English", en: "日本語" }, locale)}
      </Link>
      <br />
      <br />
      <ThemeChanger locale={locale} />
      <div>
        <h2>Profile</h2>
        {t(
          {
            ja: (
              <p>
                ハイパーIT人材を目指して奮闘中。
                <br />
                技術的な興味は、Web, 言語処理系、cryptoなど。
                <br />
                趣味は、小説を読む、ピアノを弾く、お茶を点てる、古都を巡る、などなど。
              </p>
            ),
            en: (
              <p>
                I'm striving to become a hyper-IT talent.
                <br />
                My technical interests are Web, language processing, crypto,
                etc.
                <br />
                My hobbies are reading novels, playing the piano, brewing tea,
                exploring ancient cities, etc...
              </p>
            ),
          },
          locale
        )}
      </div>
      <div>
        <h2>History</h2>
        {t(
          {
            ja: (
              <p>
                2001年東京生まれ。
                <br />
                幼稚園の終盤から約10年間を沖縄で過ごす。
                <br />
                高校入学と同時に関東へ舞い戻り、現在は大学院生。
              </p>
            ),
            en: (
              <p>
                Born in Tokyo in 2001.
                <br />
                Spent about 10 years in Okinawa from the end of kindergarten.
                <br />
                Returned to the Kanto region upon entering high school, and is
                currently a graduate student.
              </p>
            ),
          },
          locale
        )}
      </div>
      <div>
        <h2>Affiliation</h2>
        <p>
          <a
            className={LinkStyle.link}
            href="https://www.tsukuba.ac.jp"
            target="_blank"
          >
            {t({ ja: "筑波大学", en: "University of Tsukuba," }, locale)}
          </a>
          &nbsp;
          <a
            className={LinkStyle.link}
            href="https://www.chs.tsukuba.ac.jp"
            target="_blank"
          >
            {t(
              {
                ja: "人間総合科学学術院",
                en: "Graduate School of Comprehensive Human Sciences,",
              },
              locale
            )}
          </a>
          &nbsp;
          <a
            className={LinkStyle.link}
            href="https://informatics.tsukuba.ac.jp"
            target="_blank"
          >
            {t(
              {
                ja: "人間総合科学研究群 情報学学位プログラム",
                en: "Master's and Doctoral Programs in Informatics,",
              },
              locale
            )}
          </a>
          &nbsp;
          {t({ ja: "修士1年生", en: "Master's 1st year" }, locale)}
          <br />
          <a
            className={LinkStyle.link}
            href="https://www.tsukuba.ac.jp"
            target="_blank"
          >
            {t({ ja: "筑波大学", en: "University of Tsukuba," }, locale)}
          </a>
          &nbsp;
          <a
            className={LinkStyle.link}
            href="https://fusioncomplab.org"
            target="_blank"
          >
            {t(
              {
                ja: "融合知能デザイン研究室",
                en: "FusionCompLab",
              },
              locale
            )}
          </a>
          <br />
          <a
            className={LinkStyle.link}
            href="https://zerofield.biz"
            target="_blank"
          >
            {t({ ja: "株式会社ゼロフィールド", en: "ZEROFIELD, Inc." }, locale)}
          </a>
          &nbsp;
          {t(
            { ja: "インターン (休暇中)", en: "Internship (on leave)" },
            locale
          )}
          <br />
          <a
            className={LinkStyle.link}
            href="https://www.skygroup.jp"
            target="_blank"
          >
            {t({ ja: "Ｓｋｙ株式会社", en: "Sky Co., LTD." }, locale)}
          </a>
          &nbsp;
          {t({ ja: "インターン", en: "Internship" }, locale)}
          <br />
          <a
            className={LinkStyle.link}
            href="https://lifeistech.co.jp"
            target="_blank"
          >
            {t(
              { ja: "ライフイズテック株式会社", en: "Life is Tech, Inc." },
              locale
            )}
          </a>
          &nbsp;
          {t({ ja: "メンター", en: "Mentor" }, locale)}
        </p>
      </div>
      <div>
        <h2>Links</h2>
        <a
          className={LinkStyle.link}
          href="https://github.com/pictomo"
          target="_blank"
        >
          <FaGithub />
          GitHub
        </a>
        <br />
        <a
          className={LinkStyle.link}
          href="https://www.instagram.com/pictomo_m"
          target="_blank"
        >
          <FaInstagram />
          Instagram
        </a>
        <br />
        <a
          className={LinkStyle.link}
          href="https://www.facebook.com/MPictomo"
          target="_blank"
        >
          <FaFacebook />
          Facebook
        </a>
        <br />
        <a
          className={LinkStyle.link}
          href="https://twitter.com/MPictomo"
          target="_blank"
        >
          <FaXTwitter />
        </a>
        <br />
        <a
          className={`${LinkStyle.link} ${LinkStyle.noUnderline}`}
          href="https://qiita.com/pictomo_m"
          target="_blank"
        >
          {/* <SiQiita /> */}
          <span className={QiitaLogoStyle.font}>Qiita</span>
        </a>
        <br />
        <a
          className={LinkStyle.link}
          href="https://keybase.io/pictomo"
          target="_blank"
        >
          <SiKeybase />
          Keybase
        </a>
        <br />
        <a
          className={LinkStyle.link}
          href="https://booklog.jp/users/pictomo"
          target="_blank"
        >
          <BsBookFill />
          {t({ ja: "ブクログ", en: "Booklog" }, locale)}
        </a>
        <br />
        <a
          className={LinkStyle.link}
          href="https://bookmeter.com/users/1622126"
          target="_blank"
        >
          <SiBookmeter />
          {t({ ja: "読書メーター", en: "bookmeter" }, locale)}
        </a>
      </div>
      <br />
      <p>
        *{" "}
        {t(
          {
            ja: "当サイトは未完成です。暇を見つけて増改築してゆきます。",
            en: "This site is incomplete. I will add and modify it as I find time.",
          },
          locale
        )}
      </p>
    </div>
  );
};

export default Home;

import Link from "next/link";

import { I18nLocale, t } from "@/app/i18n/config";
import { Crowd4UBanner } from "@/app/components/Crowd4UBanner";
import { FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
// import { SiQiita } from "react-icons/si";

const Home = ({ locale }: { locale: I18nLocale }) => {
  return (
    <div>
      <h1>Hello, This is Pictomo!</h1>
      <Link href={locale === "ja" ? "/en" : "/ja"}>
        {t({ ja: "English", en: "日本語" }, locale)}
      </Link>
      <div>
        <h3>Profile</h3>
        {t(
          {
            ja: (
              <p>
                ハイパーIT人材を目指して奮闘中。
                <br />
                技術的な興味は、言語処理系、DB、cryptoなど。
                <br />
                趣味は、小説を読む、ピアノを弾く、お茶を点てる、古都を巡る、などなど。
              </p>
            ),
            en: (
              <p>
                I'm striving to become a hyper-IT talent.
                <br />
                My technical interests are language processing, DB, crypto, etc.
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
        <h3>History</h3>
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
        <h3>Affiliation</h3>
        <p>
          <Link href="https://www.tsukuba.ac.jp" target="_blank">
            {t({ ja: "筑波大学", en: "University of Tsukuba," }, locale)}
          </Link>
          <Link href="https://www.chs.tsukuba.ac.jp" target="_blank">
            {t(
              {
                ja: " 人間総合科学学術院",
                en: " Graduate School of Comprehensive Human Sciences,",
              },
              locale
            )}
          </Link>
          <Link href="https://informatics.tsukuba.ac.jp" target="_blank">
            {t(
              {
                ja: " 人間総合科学研究群 情報学学位プログラム",
                en: " Master's and Doctoral Programs in Informatics,",
              },
              locale
            )}
            &nbsp;
          </Link>
          {t({ ja: " 修士1年生", en: " Master's 1st year" }, locale)}
          <br />
          <Link href="https://www.tsukuba.ac.jp" target="_blank">
            {t({ ja: "筑波大学", en: "University of Tsukuba," }, locale)}
          </Link>
          <Link href="https://fusioncomplab.org" target="_blank">
            {t(
              {
                ja: " 融合知能デザイン研究室",
                en: " FusionCompLab",
              },
              locale
            )}
          </Link>
          <br />
          <Link href="https://zerofield.biz" target="_blank">
            {t({ ja: "株式会社ゼロフィールド", en: "ZEROFIELD, Inc." }, locale)}
          </Link>
          {t(
            { ja: " インターン (休暇中)", en: " Internship (on leave)" },
            locale
          )}
          <br />
          <Link href="https://www.skygroup.jp" target="_blank">
            {t({ ja: "Ｓｋｙ株式会社", en: "Sky Co., LTD." }, locale)}
          </Link>
          {t({ ja: " インターン", en: " Internship" }, locale)}
          <br />
          <Link href="https://lifeistech.co.jp" target="_blank">
            {t(
              { ja: "ライフイズテック株式会社 ", en: "Life is Tech, Inc. " },
              locale
            )}
          </Link>
          {t({ ja: " メンター", en: " Mentor" }, locale)}
        </p>
      </div>
      <div>
        <h3>Links</h3>
        <Link href="https://github.com/pictomo" target="_blank">
          <FaGithub />
          GitHub
        </Link>
        <br />
        <Link href="https://www.instagram.com/pictomo_m" target="_blank">
          <FaInstagram />
          Instagram
        </Link>
        <br />
        <Link href="https://www.facebook.com/MPictomo" target="_blank">
          <FaFacebook />
          Facebook
        </Link>
        <br />
        <Link href="https://twitter.com/MPictomo" target="_blank">
          <FaXTwitter />
        </Link>
        <br />
        <Link href="https://qiita.com/pictomo_m" target="_blank">
          {/* <SiQiita /> */}
          Qiita
        </Link>
      </div>
      <br />
      <Crowd4UBanner locale={locale} />
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

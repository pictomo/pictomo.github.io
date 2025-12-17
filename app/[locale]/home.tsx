import { I18nLocale, t } from "@/app/i18n/config";
import Link from "next/link";
import ThemeChanger from "@/app/components/theme-changer";
import P5Switch from "@/app/components/p5-switch";
import IconsView from "@/app/components/icons-view";

// import { SiQiita } from "react-icons/si";
import { FaGithub, FaInstagram, FaFacebook } from "react-icons/fa";
import {
  FaLinkedin,
  FaRegCopyright,
  FaUnity,
  FaXTwitter,
} from "react-icons/fa6";
import { SiBookmeter, SiKeybase } from "react-icons/si";
import { BsBookFill } from "react-icons/bs";
import { AiFillSignature } from "react-icons/ai";

import LinkStyle from "@/app/styles/link.module.scss";
import QiitaLogoStyle from "@/app/styles/qiita-logo.module.scss";
import IconStyle from "@/app/styles/icon.module.scss";
import SpaceStyle from "@/app/styles/space.module.scss";

const Home = ({ locale }: { locale: I18nLocale }) => {
  return (
    <div>
      <h1>Hello, This is pictomo !</h1>
      <IconsView />
      <br />
      <Link className={LinkStyle.link} href={locale === "ja" ? "/en" : "/ja"}>
        {t({ ja: "English", en: "日本語" }, locale)}
      </Link>
      <br />
      <br />
      <ThemeChanger locale={locale} />
      <br />
      <P5Switch locale={locale} />
      <br />
      <div>
        <h2>Profile</h2>
        {t(
          {
            ja: (
              <p>
                ハイパーIT人材を目指して奮闘中。
                <br />
                技術的な興味は、Web、言語処理系、cryptoなど。
                <br />
                趣味は、小説を読む、ピアノを弾く、古都を巡る、ホラー・オカルト、などなど。
              </p>
            ),
            en: (
              <p>
                I'm striving to become a hyper-IT talent.
                <br />
                My technical interests are Web, language processing, crypto,
                etc.
                <br />
                My hobbies are reading novels, playing the piano, exploring
                ancient cities, horror and occult, etc...
              </p>
            ),
          },
          locale
        )}
      </div>
      <br />
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
      <br />
      <div>
        <h2>Affiliations</h2>
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
          <br />
          {t({ ja: "修士1年生", en: "Master's 1st year" }, locale)}
          &nbsp; 2025/4~
          <br />
          <span className={SpaceStyle.harf} />
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
          <span className={SpaceStyle.harf} />
          <a
            className={LinkStyle.link}
            href="https://zerofield.biz"
            target="_blank"
          >
            {t({ ja: "株式会社ゼロフィールド", en: "ZEROFIELD, Inc." }, locale)}
          </a>
          <br />
          {t(
            { ja: "(休暇中) インターン", en: "(on leave) Internship" },
            locale
          )}
          &nbsp; 2023/9~
          <br />
          <span className={SpaceStyle.harf} />
          <a
            className={LinkStyle.link}
            href="https://www.skygroup.jp"
            target="_blank"
          >
            {t({ ja: "Ｓｋｙ株式会社", en: "Sky Co., LTD." }, locale)}
          </a>
          <br />
          {t({ ja: "インターン", en: "Internship" }, locale)}
          &nbsp; 2025/6~
          <br />
          <span className={SpaceStyle.harf} />
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
          <br />
          {t({ ja: "メンター", en: "Mentor" }, locale)}
          &nbsp; 2023/7~
        </p>
        <h3>Past Affiliations</h3>
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
              ja: "情報学群",
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
              ja: "情報メディア創成学類",
              en: "Master's and Doctoral Programs in Informatics,",
            },
            locale
          )}
        </a>
        <br />
        &nbsp; 2017/4~2020/3
        <br />
        <span className={SpaceStyle.harf} />
        <a
          className={LinkStyle.link}
          href="https://kaichigakuen.ed.jp"
          target="_blank"
        >
          {t({ ja: "開智学園", en: "Kaichi Gakuen" }, locale)}
        </a>
        &nbsp;
        <a
          className={LinkStyle.link}
          href="https://koutoubu.kaichigakuen.ed.jp"
          target="_blank"
        >
          {t(
            {
              ja: "開智高等学校 [高等部]",
              en: "Kaichi High School",
            },
            locale
          )}
        </a>
        <br />
        &nbsp; 2021/4~2025/3
      </div>
      <br />
      <div>
        <h2>Links</h2>
        <a
          className={LinkStyle.link}
          href="https://github.com/pictomo"
          target="_blank"
        >
          <FaGithub
            className={`${IconStyle.adjust} ${IconStyle.rightMargin}`}
          />
          GitHub
        </a>
        <br />
        <a
          className={LinkStyle.link}
          href="https://www.instagram.com/pictomo_m"
          target="_blank"
        >
          <FaInstagram
            className={`${IconStyle.adjust} ${IconStyle.rightMargin}`}
          />
          Instagram
        </a>
        <br />
        <a
          className={LinkStyle.link}
          href="https://www.facebook.com/MPictomo"
          target="_blank"
        >
          <FaFacebook
            className={`${IconStyle.adjust} ${IconStyle.rightMargin}`}
          />
          Facebook
        </a>
        <br />
        <a
          className={LinkStyle.link}
          href="https://twitter.com/MPictomo"
          target="_blank"
        >
          <FaXTwitter
            className={`${IconStyle.adjust} ${IconStyle.rightMargin}`}
          />
        </a>
        <br />
        <a
          className={`${LinkStyle.link} ${LinkStyle.noUnderline}`}
          href="https://qiita.com/pictomo"
          target="_blank"
        >
          {/* <SiQiita /> */}
          <span className={QiitaLogoStyle.font}>Qiita</span>
        </a>
        <br />
        <a
          className={LinkStyle.link}
          href="https://unityroom.com/users/jhm09bwdtxc18rlenf73"
          target="_blank"
        >
          <FaUnity className={`${IconStyle.adjust} ${IconStyle.rightMargin}`} />
          unityroom
        </a>
        <br />
        <a
          className={LinkStyle.link}
          href="https://booklog.jp/users/pictomo"
          target="_blank"
        >
          <BsBookFill
            className={`${IconStyle.adjust} ${IconStyle.rightMargin}`}
          />
          {t({ ja: "ブクログ", en: "Booklog" }, locale)}
        </a>
        <br />
        <a
          className={LinkStyle.link}
          href="https://bookmeter.com/users/1622126"
          target="_blank"
        >
          <SiBookmeter
            className={`${IconStyle.adjust} ${IconStyle.rightMargin}`}
          />
          {t({ ja: "読書メーター", en: "bookmeter" }, locale)}
        </a>
      </div>
      <br />
      <div>
        <h2>Authenticity</h2>
        <a
          className={LinkStyle.link}
          href="https://keybase.io/pictomo"
          target="_blank"
        >
          <SiKeybase
            className={`${IconStyle.adjust} ${IconStyle.rightMargin}`}
          />
          Keybase
        </a>
        <br />
        <a
          className={LinkStyle.link}
          href="/keybase.txt"
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillSignature
            className={`${IconStyle.adjust} ${IconStyle.rightMargin}`}
          />
          {t(
            {
              ja: "署名",
              en: "Signature",
            },
            locale
          )}
        </a>
        <br />
        <a
          className={LinkStyle.link}
          href="https://www.linkedin.com/in/pictomo"
          target="_blank"
        >
          <FaLinkedin
            className={`${IconStyle.adjust} ${IconStyle.rightMargin}`}
          />
          {t(
            {
              ja: "LinkedIn (認証済)",
              en: "LinkedIn (verified)",
            },
            locale
          )}
        </a>
      </div>
      <br />
      <div>
        <h2>Contacts</h2>
        {t(
          {
            ja: (
              <p>
                スパム対策のため、メールアドレスは公開しておりません。
                <br />
                お初のご連絡は&nbsp;
                <a
                  className={LinkStyle.link}
                  href="https://www.facebook.com/MPictomo"
                  target="_blank"
                >
                  Facebook Messenger
                </a>
                &nbsp;より承ります。
              </p>
            ),
            en: (
              <p>
                To prevent spam, email addresses are not disclosed.
                <br />
                For first-time contact, please reach out via&nbsp;
                <a
                  className={LinkStyle.link}
                  href="https://www.facebook.com/MPictomo"
                  target="_blank"
                >
                  Facebook Messenger
                </a>
                .
              </p>
            ),
          },
          locale
        )}
      </div>
      <br />
      <p>
        <FaRegCopyright className={IconStyle.adjust} /> 2024-
        {new Date().getFullYear()} pictomo
      </p>
    </div>
  );
};

export default Home;

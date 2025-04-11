import Link from "next/link";
import { Crowd4UBanner } from "./components/Crowd4UBanner";

const Home = () => {
  return (
    <div>
      <h1>Hello, This is Pictomo!</h1>
      <div>
        <h3>Profile</h3>
        <p>
          エンジニアを目指して奮闘中。
          <br />
          技術的な興味は、言語処理系、DB、cryptoなど。
          <br />
          趣味は、小説を読む、ピアノを弾く、お茶を点てる、廃墟を巡る、古都を巡る、などなど。
        </p>
      </div>
      <div>
        <h3>History</h3>
        <p>
          2001年東京生まれ。
          <br />
          幼稚園の終盤から約10年間沖縄で時を過ごす。
          <br />
          高校入学と同時に関東へ舞い戻り、現在は大学院生。
        </p>
      </div>
      <div>
        <h3>Affiliation</h3>
        <p>
          <Link href="https://www.tsukuba.ac.jp">筑波大学 </Link>
          <Link href="https://www.chs.tsukuba.ac.jp">人間総合科学学術院 </Link>
          <Link href="https://informatics.tsukuba.ac.jp">
            人間総合科学研究群 情報学学位プログラム&nbsp;
          </Link>
          修士1年生
          <br />
          <Link href="https://www.tsukuba.ac.jp">筑波大学 </Link>
          <Link href="https://fusioncomplab.org">融合知能デザイン研究室</Link>
          <br />
          <Link href="https://zerofield.biz">株式会社ゼロフィールド </Link>
          インターン
          <br />
          <Link href="https://lifeistech.co.jp">ライフイズテック株式会社 </Link>
          メンター
        </p>
      </div>
      <div>
        <h3>Links</h3>
        <Link href="https://github.com/pictomo">GitHub</Link>
        <br />
        <Link href="https://twitter.com/MPictomo">X</Link>
        <br />
        <Link href="https://www.instagram.com/pictomo_m">Instagram</Link>
        <br />
        <Link href="https://www.facebook.com/MPictomo">Facebook</Link>
      </div>
      <br />
      <Crowd4UBanner />
      <br />
      <p>* 当サイトは未完成です。暇を見つけて増改築してゆきます。</p>
    </div>
  );
};

export default Home;

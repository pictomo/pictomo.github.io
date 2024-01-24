import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1>Hello, This is Pictomo!</h1>
      <div>
        <h3>Profile</h3>
        <p>
          エンジニアを目指して奮闘中。
          <br />
          興味は、言語処理系、DB、cryotoなど。
          <br />
          趣味は、小説を読む、ピアノを弾く、お茶を点てる、廃墟を巡る、京を巡る、などなど。
        </p>
      </div>
      <div>
        <h3>History</h3>
        <p>
          2001年東京生まれ。
          <br />
          幼稚園の終盤から約10年間沖縄で時を過ごす。
          <br />
          高校入学と同時に関東へ舞い戻り、現在は大学生。
        </p>
      </div>
      <div>
        <h3>Affiliation</h3>
        <p>
          筑波大学 情報学群 情報メディア創成学類 3年生
          <br />
          筑波大学 融合知能デザイン研究室
          <br />
          株式会社ゼロフィールド(インターン)
          <br />
          ライフイズテック株式会社(インターン)
        </p>
      </div>
      <div>
        <h3>Links</h3>
        <Link href="https://github.com/pictomo">GitHub</Link>
        <br />
        <Link href="https://twitter.com/MPictomo">X</Link>
        <br />
        <Link href="https://www.instagram.com/pictomo_m">Instagram</Link>
      </div>
    </div>
  );
};

export default Home;

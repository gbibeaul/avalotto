import Image from "next/image";

import { Navbar } from "components/app/Navbar";
import { Footer } from "components/app/Footer";
import { Hero } from "components/app/Hero";
import { Featured } from "components/app/Featured";
import { Features } from "components/app/Features";
import { HomePageLayout } from "components/app/HomepageLayout";
import { VideoBanner } from "components/app/VideoBanner";
import Head from "next/head";

const description = `The Gamebit Universe is a cryptocurrency casino that offers a metaverse experience. This exciting collection of NFTs is a fun and exciting place to explore. With tons of games and activities to enjoy, you'll never run out of things to do. So come on in and have some fun!`;

const title = "Gamebit Universe";

const IndexPage = () => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="description" content={description}></meta>
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:description" content={description} key="ogdesc" />
      <title>{title}</title>
    </Head>
    <HomePageLayout>
      <VideoBanner />
      <Hero />
      <Features />
      {/* <Featured /> */}
    </HomePageLayout>
  </>
);

export default IndexPage;

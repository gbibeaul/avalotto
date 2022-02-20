import Image from "next/image";

import { Navbar } from "components/app/Navbar";
import { Footer } from "components/app/Footer";
import { Hero } from "components/app/Hero";
import { Featured } from "components/app/Featured";
import { Features } from "components/app/Features";
import { HomePageLayout } from "components/app/HomepageLayout";
import { VideoBanner } from "components/app/VideoBanner";

const IndexPage = () => (
  <HomePageLayout>
    <VideoBanner />
    <Hero />
    <Features />
    {/* <Featured /> */}
  </HomePageLayout>
);

export default IndexPage;

import Image from "next/image";

import { Navbar } from "components/app/Navbar";
import { Footer } from "components/app/Footer";
import { Hero } from "components/app/Hero";
import { Featured } from "components/app/Featured";
import { Features } from "components/app/Features";

const IndexPage = () => (
  <main className="bg-black f-full">
    <div className="sticky top-0 bg-black -z-index-20 flex justify-end overflow-hidden">
      <Image src="/Flare1.svg" height={700} width={700} />
    </div>
    <Navbar />

    <Hero />
    <Features />
    <Featured />
    <Footer />
  </main>
);

export default IndexPage;

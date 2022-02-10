import { Navbar } from "components/app/Navbar";
import { Footer } from "components/app/Footer";
import { Hero } from "components/app/Hero";
import { Featured } from "components/app/Featured";
import { Features } from "components/app/Features";

const IndexPage = () => (
  <main className="bg-black f-full">
    <Navbar />
    <Hero />
    <Features />
    <Featured />
    <Footer />
  </main>
);

export default IndexPage;

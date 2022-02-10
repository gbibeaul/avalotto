import { Navbar } from "components/app/Navbar";
import { Footer } from "components/app/Footer";
import { Hero } from "components/app/Hero";
const IndexPage = () => (
  <main className="bg-black f-full">
    <Navbar />
    <Hero />
    <Footer />
  </main>
);

export default IndexPage;

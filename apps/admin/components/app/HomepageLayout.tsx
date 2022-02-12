import Image from "next/image";
import { Navbar } from "components/app/Navbar";
import { Footer } from "components/app/Footer";
import { ConnectModal } from "components/app/ConnectModal";
import { ConnectModalProvider } from "hooks/user";

export const HomePageLayout: React.FC = ({ children }) => {
  return (
    <ConnectModalProvider>
      <ConnectModal />
      <main className="bg-black f-full h-full">
        <div className="sticky top-0 bg-black -z-index-20 flex justify-end overflow-hidden">
          <Image src="/Flare1.svg" height={700} width={700} />
        </div>
        <Navbar />
        {children}
        <Footer />
      </main>
    </ConnectModalProvider>
  );
};

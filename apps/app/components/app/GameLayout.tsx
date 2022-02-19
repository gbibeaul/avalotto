import Image from "next/image";
import { Navbar } from "components/app/Navbar";
import { Footer } from "components/app/Footer";
import { ConnectModal } from "components/app/ConnectModal";
import { ConnectModalProvider } from "hooks/user";

export const GameLayout: React.FC = ({ children }) => {
  return (
    <ConnectModalProvider>
      <ConnectModal />
      <main className="bg-black h-full f-full">
        <div className="sticky top-0 bg-black -z-index-20 flex justify-end overflow-hidden">
          <Image
            alt="Flare in the background showing a dimmed light"
            src="/Flare1.svg"
            height={700}
            width={700}
          />
        </div>
        <Navbar />
        <section className="relative flex justify-center">{children}</section>
        <Footer />
      </main>
    </ConnectModalProvider>
  );
};

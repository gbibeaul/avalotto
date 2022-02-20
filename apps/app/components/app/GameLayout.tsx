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
        <Navbar />
        <section className="relative flex justify-center">{children}</section>
        <Footer />
      </main>
    </ConnectModalProvider>
  );
};

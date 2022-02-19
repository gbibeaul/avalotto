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
        <Navbar />
        {children}
        <Footer />
      </main>
    </ConnectModalProvider>
  );
};

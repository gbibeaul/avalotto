import Image from "next/image";
import { createStateContext } from "react-use";
import { Navbar } from "components/app/Navbar";
import { Footer } from "components/app/Footer";
import { ConnectModal } from "components/app/ConnectModal";

const [hook, ConnetModalProvider] = createStateContext(true);

export const Layout: React.FC = ({ children }) => {
  return (
    <ConnetModalProvider>
      <ConnectModal />

      <main className="bg-black f-full">
        <div className="sticky top-0 bg-black -z-index-20 flex justify-end overflow-hidden">
          <Image src="/Flare1.svg" height={700} width={700} />
        </div>
        <Navbar />
        {children}
        <Footer />
      </main>
    </ConnetModalProvider>
  );
};

export const useConnectModal = hook;

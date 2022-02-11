import styles from "styles/Animations.module.css";
import Image from "next/image";
import { useConnectModal } from "./Layout";

export const Hero = () => {
  const [_, setOpen] = useConnectModal();
  return (
    <div className="relative py-16 flex justify-center">
      <div
        className="hidden absolute top-0 inset-x-0 h-1/4 lg:block"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto lg:px-48">
        <div className="lg:grid lg:grid-cols-12 p-8">
          <div className="relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-16 lg:bg-transparent">
            <div className="max-w-md mx-auto px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0">
              <div className="hidden lg:block aspect-w-10 flex justify-center aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1">
                <Image
                  className="object-cover object-center rounded-3xl shadow-2xl"
                  src="/Mascot.png"
                  height={600}
                  width={500}
                  alt="A vegas Shark"
                />
              </div>
            </div>
          </div>

          <div
            className={`${styles.gradient} relative max-w-2xl Pastel bg-gradient-to-tr from-pink-500 to-orange-300 to-blue-300 lg:col-start-3 lg:row-start-1 lg:col-span-10 rounded-3xl lg:grid lg:grid-cols-10 lg:items-center`}
          >
            <div className="relative max-w-md mx-auto py-12 px-4 space-y-6 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 lg:col-start-4 lg:col-span-6">
              <h2
                className="text-3xl font-extrabold text-white"
                id="join-heading"
              >
                Enter the GAMEBIT universe!
              </h2>
              <p className="text-lg text-white">
                We offer the best in crypto gaming with unmatched rewards and
                bonuses. Visit us today and start playing to earn!
              </p>
              <button
                onClick={() => setOpen(true)}
                className="hidden lg:block w-full py-3 px-5 text-center bg-white border border-transparent rounded-md shadow-md text-base font-medium text-indigo-700 hover:bg-gray-50 sm:inline-block sm:w-auto"
              >
                Connect your wallet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import Image from "next/image";

const features = [
  {
    name: "Connect your wallet",
    icon: "/WalletIcon.svg",
    description:
      "Once you’ve set up your wallet of choice and get notified about your winnings on your platform of choice! ",
  },
  {
    name: "Earn rewards for playing games",
    icon: "/RewardIcon.svg",
    description:
      "Get rewarded for playing games and activities on the Gamebit Universe.",
  },
  {
    name: "Exclusive events for NFT holders",
    icon: "/NftIcon.svg",
    description:
      "Owner of All IN! NFTs can participate in exclusive events and be the first to win!",
  },
];

export const Features = () => {
  return (
    <div className="relative py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <p className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          How it works
        </p>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <Image
                      alt={feature.description}
                      src={feature.icon}
                      height={60}
                      width={60}
                    />
                    <h3 className="mt-8 text-lg font-medium text-white tracking-tight">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-white">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

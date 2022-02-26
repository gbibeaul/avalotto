/* This example requires Tailwind CSS v2.0+ */
import { HomePageLayout } from "components/app/HomepageLayout";
import Image from "next/image";
import {
  AnnotationIcon,
  CakeIcon,
  LightningBoltIcon,
  PuzzleIcon,
  CogIcon,
  ShareIcon,
} from "@heroicons/react/outline";
import Head from "next/head";
import { SocialShare } from "components/app/SocialShare";
import { useRouter } from "next/router";

const transferFeatures = [
  {
    id: 1,
    name: "Bleeding Edge Gaming Infrastructure - Q1 2022",
    description:
      "We are building the next generation of web3 gaming infrastructure to deliver the best gaming experience to our players. Trusted decentralized RNGs and smart contracts power the Gamebit engine.",
    icon: CogIcon,
  },
  {
    id: 2,
    name: "NFT Launch - Q1 2022",
    description:
      "Our mint will allow early adopters of the Gamebit Universe to play  and earn rewards for playing games within the Gamebit Universe. Test your luck with our NFT lottery and scratch cards!",
    icon: CakeIcon,
  },
  {
    id: 3,
    name: "NFT battles - Q2 2022",
    description:
      "Use your NFTs in battle-style games against other NFTs from other collections. Earn rewards for winning and participating in league matches; games will be broadcasted live on the Gamebit Universe - Esports meets NFTs & web3.",
    icon: LightningBoltIcon,
  },
];
const communicationFeatures = [
  {
    id: 1,
    name: "Events platform",
    description:
      "Strong communities power web3. Gamebit is creating a platform for events, tournaments, giveaways and parties. Gamebit is where the game is for GameFi on Avalanche!",
    icon: AnnotationIcon,
  },
  {
    id: 2,
    name: "More Games!",
    description:
      "Gamebit will launch NFT fantasy leagues, NFT racing and more. You will be able to play and earn rewards for playing games and activities in the Gamebit Universe. Mix and match your favorite NFT collections across an assortment of fun games!",
    icon: PuzzleIcon,
  },
];

const description = `The Gamebit Universe is a cryptocurrency casino that offers a unique experience. This exciting collection of NFTs is a fun and exciting place to explore. With tons of games and activities to enjoy, you'll never run out of things to do. So come on in and have some fun!`;

const title = "Gamebit Roadmap";

export default function Roadmap() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content={description}></meta>
        <meta property="og:title" content={title} key="ogtitle" />
        <meta property="og:description" content={description} key="ogdesc" />
        <title>{title}</title>
      </Head>
      <HomePageLayout>
        <div className="py-16 bg-black overflow-hidden lg:py-24">
          <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="relative">
              <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl flex justify-center items-center">
                Gamebit Universe Roadmap
                <span className="ml-1 mt-1">
                  <SocialShare title="Gamebit Roadmap" text="" />
                </span>
              </h2>
              <span className="flex justify-center mt-4"></span>

              <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-white">
                Enter a world of thrill and excitement with the Gamebit
                Universe. Use your favorite NFT characters to participate in
                online battles and tournaments: earn rewards for participating,
                socialize with other players, and much more.
              </p>
            </div>

            <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="relative">
                <h3 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
                  Phase 1 (Q2-2022): NFT, Protocol and Community
                </h3>
                <p className="mt-3 text-lg text-white">
                  The first phase of our roadmap will see us launching the
                  Universe and Protocol. Our NFT collection is based on rarity
                  and serves as the foundation of our community. Holders will
                  receive exclusive VIP access to our event spaces, giveaways
                  and the discord community.
                </p>

                <dl className="mt-10 space-y-10">
                  {transferFeatures.map((item) => (
                    <div key={item.id} className="relative">
                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-tr from-violet-500 to-orange-300 text-white">
                          <item.icon className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <p className="ml-16 text-lg leading-6 font-medium text-white">
                          {item.name}
                        </p>
                      </dt>
                      <dd className="mt-2 ml-16 text-base text-white">
                        {item.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="px-12 -mx-4 relative lg:mt-0" aria-hidden="true">
                <Image
                  width={200}
                  height={200}
                  layout="responsive"
                  src="/Avascratch.jpg"
                  alt=""
                />
              </div>
            </div>

            <div className="relative mt-12 sm:mt-16 lg:mt-24">
              <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
                <div className="lg:col-start-2">
                  <h3 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
                    Phase 2 (Q4 - 2022): Events, Giveaways and Games
                  </h3>
                  <p className="mt-3 text-lg text-white">
                    In Phase 2, we will be launching our event spaces and
                    giveaways. Gamebit is focused on community and will be a
                    platform for the community to come together. We will host
                    token launch parties, metaverse concerts, conventions and
                    much more.
                  </p>

                  <dl className="mt-10 space-y-10">
                    {communicationFeatures.map((item) => (
                      <div key={item.id} className="relative">
                        <dt>
                          <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-tr from-violet-500 to-orange-300 text-white">
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <p className="ml-16 text-lg leading-6 font-medium text-white">
                            {item.name}
                          </p>
                        </dt>
                        <dd className="mt-2 ml-16 text-base text-white">
                          {item.description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div
                  className="px-12 -mx-4 relative lg:mt-0"
                  aria-hidden="true"
                >
                  <Image
                    width={200}
                    height={200}
                    layout="responsive"
                    src="/Avalotto.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomePageLayout>
    </>
  );
}

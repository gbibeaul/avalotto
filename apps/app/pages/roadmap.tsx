/* This example requires Tailwind CSS v2.0+ */
import { HomePageLayout } from "components/app/HomepageLayout";
import {
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  MailIcon,
  ScaleIcon,
} from "@heroicons/react/outline";
import Head from "next/head";

const transferFeatures = [
  {
    id: 1,
    name: "Bleeding Edge Gaming Infrastructure - Q1 2022",
    description:
      "We are building the next generation of web3 gaming infrastructure to deliver the best gaming experience to our users. Trusted decentralized RNGs and smart contracts power the Gamebit engine",
    icon: GlobeAltIcon,
  },
  {
    id: 2,
    name: "NFT Launch - Q1 2022",
    description:
      "Our mint will let early adopters of the Gamebit Universe play for free and earn rewards for playing games and activities on the Gamebit Universe. Test your luck with our NFT lottery and scratch cards",
    icon: ScaleIcon,
  },
  {
    id: 3,
    name: "NFT fight league - Q3 2022",
    description:
      "Use your NFTs and sponsor them to fights against other collections of NFTs. Earn rewards for winning and participating in the league Matches will be broadcasted live on the Gamebit Universe",
    icon: LightningBoltIcon,
  },
];
const communicationFeatures = [
  {
    id: 1,
    name: "Event platform",
    description:
      "Strong communities power web3. Gamebit is creating a platform for events, tournaments, giveaways and parties. Gamebit is where you will find the best happenigns in Avalanche!",
    icon: AnnotationIcon,
  },
  {
    id: 2,
    name: "More Games!",
    description:
      "Gamebit will launch NFT fantasy leagues, NFT racing and more. You will be able to play for free and earn rewards for playing games and activities on the Gamebit Universe. Mix and match your favorite NFT collections in those games!",
    icon: MailIcon,
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
              <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                Gamebit Universe Roadmap
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-white">
                Enter a world of thrill and excitement with the Gamebit
                Universe. Use your favorite NFT characters to take part in
                online battles and tournaments, socialize with other players,
                and much more.
              </p>
            </div>

            <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
              <div className="relative">
                <h3 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
                  Phase 1 (Q2-2002): NFT, Protocol and Community
                </h3>
                <p className="mt-3 text-lg text-white">
                  The the first phase our roadmap see us launching the Universe
                  and Protocol. Our NFT collection serves as the foundation of
                  our community. Holders will receive exclusive first access to
                  our event space, giveaways and discord community.
                </p>

                <dl className="mt-10 space-y-10">
                  {transferFeatures.map((item) => (
                    <div key={item.id} className="relative">
                      <dt>
                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
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

              <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
                <img
                  className="relative mx-auto"
                  width={490}
                  src="https://tailwindui.com/img/features/feature-example-1.png"
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
                    Phase 2 will see us launching the events space and
                    giveaways. Gamebit is a place for the community to come
                    together. We will host token launch parties, metaverse
                    concerts and conventions, and much more.
                  </p>

                  <dl className="mt-10 space-y-10">
                    {communicationFeatures.map((item) => (
                      <div key={item.id} className="relative">
                        <dt>
                          <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
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

                <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
                  <img
                    className="relative mx-auto"
                    width={490}
                    src="https://tailwindui.com/img/features/feature-example-2.png"
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

import { useEffect, useState, useRef, ChangeEvent, FormEvent } from "react";
import Lottie from "lottie-react";
import styles from "styles/Animations.module.css";
import animation from "components/app/avax-coin-explossion.animation.json";
import Head from "next/head";
import Link from "next/link";
import fetcher from "tranport/fetcher";
import { useRouter } from "next/router";
import { HomePageLayout } from "components/app/HomepageLayout";

const description = `This exciting universe of NFTs is a fun and exciting
place to explore. With tons of games and activities to
enjoy, you'll never run out of things to do. So come
on in and have some fun!`;

const title = "Gamebit Mint";

const MintPage = () => {
  const [animationStep, setAnimationStep] = useState(0);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setAnimationStep(1), 500);
    setTimeout(() => setAnimationStep(2), 4000);
    setTimeout(() => setAnimationStep(3), 9000);
  }, []);

  const bgClasses = `${styles.gradient} ${styles.gradual} Pastel bg-gradient-to-tr from-pink-500 to-orange-300 to-blue-300`;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetcher("/mint", { method: "POST", body: JSON.stringify({ email }) });
    setShowSuccess(true);

    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

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
      <div
        className={`h-screen w-screen ${animationStep === 3 ? bgClasses : ""}`}
      >
        <div className="flex justify-center items-center h-full ">
          {animationStep === 1 && (
            <Lottie
              className={`${styles.fade} h-full w-full`}
              animationData={animation}
              autoPlay={false}
              loop={false}
            />
          )}
          {animationStep === 2 && (
            <p className={`${styles.reveal} mt-1 italic text-9xl text-white`}>
              Gamebit
            </p>
          )}
          {animationStep === 3 && (
            <div className="inline-block bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle  sm:p-6">
              <div>
                <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
                  <Link passHref href="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                      />
                    </svg>
                  </Link>
                  <div className="relative rounded-2xl px-6 py-10  overflow-hidden sm:px-12 sm:py-20">
                    <div className="relative">
                      <div className="sm:text-center">
                        <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                          Welcome to the Gamebit Universe!
                        </h2>
                        <p className="mt-6 mx-auto max-w-2xl text-lg text-indigo-200">
                          This exciting universe of NFTs is a fun and exciting
                          place to explore. With tons of games and activities to
                          enjoy, you will never run out of things to do. So come
                          on in and have some fun!
                        </p>
                      </div>
                      {showSuccess && (
                        <p className="mt-6 flex justify-center mx-auto max-w-2xl text-lg text-indigo-200">
                          Redirecting to home page...
                        </p>
                      )}
                      <form
                        action="#"
                        onSubmit={handleSubmit}
                        className="mt-12 sm:mx-auto sm:max-w-lg sm:flex"
                      >
                        <div className="min-w-0 flex-1">
                          <label htmlFor="cta-email" className="sr-only">
                            Email address
                          </label>
                          <input
                            id="cta-email"
                            required
                            type="email"
                            value={email}
                            onChange={handleEmail}
                            className="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                            placeholder="Join the mailing list"
                          />
                        </div>

                        <div className="mt-4 sm:mt-0 sm:ml-3">
                          <button
                            type="submit"
                            disabled={loading}
                            className="block w-full rounded-md border border-transparent px-5 py-3 ext-white Pastel bg-gradient-to-tr text-white from-violet-500 to-orange-300 hover:opcaity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                          >
                            {showSuccess ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            ) : (
                              "Sign up!"
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MintPage;

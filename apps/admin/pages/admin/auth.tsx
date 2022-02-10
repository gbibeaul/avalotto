import { NextPage } from "next";
import Lottie from "react-lottie-player";
import { useConnect, useAccount } from "wagmi";
import { signIn } from "next-auth/react";

import lottieJson from "animations/avatar.json";
import React from "react";

const SignIn: NextPage = () => {
  const [{ data: connectData }, connect] = useConnect();
  const [{ data: accountData }] = useAccount();

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const callbackUrl = "/admin";
    if (accountData?.address) {
      signIn("credentials", { address: accountData.address, callbackUrl });
      return;
    }
    const { data } = await connect(connectData.connectors[0]);

    signIn("credentials", { address: data?.account, callbackUrl });
  };

  return (
    <div className="min-h-full bg-gradient-to-r from-gray-700 via-gray-900 to-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form
            onSubmit={handleLogin}
            className="space-y-6"
            action="#"
            method="POST"
          >
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your Gamebit Dashboard
              </h2>
              <section className="grid place-content-center">
                <Lottie
                  loop
                  animationData={lottieJson}
                  play
                  style={{ width: 150, height: 150 }}
                />
              </section>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Connect Metamask
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

import { ScaleIcon } from "@heroicons/react/outline";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useAccount } from "wagmi";
import { NextPage, NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import { getShortenedAddress } from "utils/display.utils";
import { AdminLayout } from "components/AdminLayout";
import { useIsStaff } from "hooks/user";
import { useContext } from "react";

const cards = [
  {
    name: "Treasury balance",
    href: "#",
    icon: ScaleIcon,
    amount: "30,659.45",
  },
];

const Home: NextPage = () => {
  const [{ data: accountData }, disconnect] = useAccount();
  const isStaff = useIsStaff();

  const handleSignout = async () => {
    signOut();
  };

  return (
    <AdminLayout>
      <main className="flex-1 pb-8">
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                      Welcome {getShortenedAddress(accountData?.address ?? "")}
                    </h1>
                  </div>
                  {isStaff && (
                    <span className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <span className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        <CheckCircleIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                          aria-hidden="true"
                        />
                        staff
                      </span>
                    </span>
                  )}
                  <button className="ml-8" onClick={handleSignout}>
                    Signout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Overview
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((card) => (
                <div
                  key={card.name}
                  className="bg-white overflow-hidden shadow rounded-lg"
                >
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <card.icon
                          className="h-6 w-6 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            {card.name}
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {card.amount}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-5 py-3">
                    <div className="text-sm">
                      <a
                        href={card.href}
                        className="font-medium text-cyan-700 hover:text-cyan-900"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </AdminLayout>
  );
};

export default Home;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}

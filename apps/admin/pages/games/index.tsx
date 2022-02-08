import { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { AdminLayout } from "components/AdminLayout";
import { useIsStaff } from "hooks/user";
import useSWR from "swr";
import fetchAPI from "tranport/fetcher";
import type { GamebitContract } from "utils/config.utils";
import { Card } from "components/Card";
import { ServerIcon } from "@heroicons/react/solid";

const Home: NextPage = () => {
  useIsStaff(true);
  const { data } = useSWR<GamebitContract[]>("/games", fetchAPI);

  if (!data) {
    return <AdminLayout></AdminLayout>;
  }
  return (
    <AdminLayout>
      <main className="flex-1 pb-8">
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Games
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.map((game) => (
                <Card
                  key={game.name}
                  name={game.name}
                  Icon={ServerIcon}
                  href={`games/${game.name}`}
                  address={game.address}
                  hrefText={game.name}
                />
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

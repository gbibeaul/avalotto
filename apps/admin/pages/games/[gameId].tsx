import { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { AdminLayout } from "components/admin/AdminLayout";
import { useIsStaff } from "hooks/user";
import useSWR from "swr";
import fetchAPI from "tranport/fetcher";
import type { GamebitContract } from "utils/config.utils";
import { getShortenedAddress } from "utils/display.utils";
import { useRouter } from "next/router";
import { Actions } from "components/Actions";

const Home: NextPage = () => {
  const { query } = useRouter();
  const { data } = useSWR<GamebitContract>(
    `/games?gameId=${query.gameId}`,
    fetchAPI
  );
  useIsStaff(true);

  if (!data) {
    return <AdminLayout></AdminLayout>;
  }
  return (
    <AdminLayout>
      <main className="flex-1 p-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mb-8">
            {data.name} - {getShortenedAddress(data.address)}
          </h2>
        </div>
        <Actions />
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

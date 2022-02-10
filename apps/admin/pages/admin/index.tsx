import { ScaleIcon } from "@heroicons/react/outline";
import { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { AdminLayout } from "components/admin/AdminLayout";

const Home: NextPage = () => {
  return (
    <AdminLayout>
      <main className="flex-1 pb-8">
        <div className="mt-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Overview
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"></div>
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
        destination: "/admin/auth",
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

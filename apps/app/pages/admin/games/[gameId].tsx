import { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { AdminLayout } from "components/admin/AdminLayout";
import { useIsStaff } from "hooks/user";
import { GamebitContract, getGameByName } from "utils/config.utils";
import { getShortenedAddress } from "utils/display.utils";
import { Authorizations } from "components/admin/Authorizations";
import { gameInstanceProvider } from "tranport/games";
import { Stats } from "components/admin/Stats";
import { useSigner } from "wagmi";
import { BigNumber } from "ethers";
import { ethers } from "ethers";

const Home: NextPage<{ gameData: GamebitContract }> = ({ gameData }) => {
  useIsStaff(true);
  const [{ data: signerData }] = useSigner();
  const gameInstance = gameInstanceProvider(signerData);

  if (!gameData) {
    return <AdminLayout></AdminLayout>;
  }

  const handlePaceTestBet = () => {
    gameInstance.functions.play({ value: ethers.utils.parseEther("1") });
  };
  return (
    <AdminLayout>
      <main className="flex-1 p-8">
        <button onClick={handlePaceTestBet} className="bg-white">
          Test bet
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="text-5xl font-bold leading-7 text-white sm:text-3xl sm:truncate mb-8">
            {gameData.name} - {getShortenedAddress(gameData.address)}
          </h2>
        </div>

        <p className="text-sm text-white sm:text-3xl sm:truncate my-8">Stats</p>
        <Stats gameAddress={gameData.address} gameName={gameData.name} />
        <p className="text-sm text-white sm:text-3xl sm:truncate my-8">
          Authorizations
        </p>
        <Authorizations
          gameAddress={gameData.address}
          gameName={gameData.name}
        />
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
  const gameData = getGameByName(String(context.query.gameId));

  return {
    props: {
      session,
      gameData,
    },
  };
}

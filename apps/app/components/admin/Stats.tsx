import { Switch } from "@headlessui/react";
import { utils } from "ethers";
import { useSigner } from "wagmi";
import { treasuryProvider } from "tranport/protocol";
import useSWR from "swr";

type StatsProps = {
  gameAddress: string;
  gameName: string;
};

export const Stats: React.VFC<StatsProps> = ({ gameAddress, gameName }) => {
  const [{ data: signerData }] = useSigner();
  const treasury = treasuryProvider(signerData);

  const { data: funds } = useSWR(`${gameName}-funds`, () =>
    treasury.getGameFunds(gameAddress)
  );

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        {funds && (
          <li>
            <span className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">
                    Funds
                  </p>
                  <div className="ml-2 flex-shrink-0 flex">
                    {funds.toString()} AVAX
                  </div>
                </div>
              </div>
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

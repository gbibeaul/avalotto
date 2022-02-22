import { Switch } from "@headlessui/react";
import { utils } from "ethers";
import { useSigner } from "wagmi";
import { authorizationProvider } from "tranport/protocol";
import useSWR from "swr";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type AuthorizationsProps = {
  gameAddress: string;
  gameName: string;
};

const Toggle: React.VFC<{
  enabled: boolean;
  onChange: VoidFunction;
  title: string;
}> = ({ enabled, onChange, title }) => {
  return (
    <li>
      <span className="block hover:bg-gray-50">
        <div className="px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-indigo-600 truncate">
              {title}
            </p>
            <div className="ml-2 flex-shrink-0 flex">
              <Switch
                checked={enabled}
                onChange={onChange}
                className={classNames(
                  enabled ? "bg-indigo-600" : "bg-gray-200",
                  "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    enabled ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                  )}
                />
              </Switch>
            </div>
          </div>
        </div>
      </span>
    </li>
  );
};

export const Authorizations: React.VFC<AuthorizationsProps> = ({
  gameAddress,
  gameName,
}) => {
  const [{ data: signerData }] = useSigner();
  const auth = authorizationProvider(signerData);

  const { data: isApproved } = useSWR(`${gameName}-protocol`, () =>
    auth.isGameAuthorized(gameAddress)
  );
  const { data: isRngApproved } = useSWR(`${gameName}-rng`, () =>
    auth.isGameRngAuthorized(gameAddress)
  );
  const { data: isPlayProfitApproved } = useSWR(`${gameName}-play-profit`, () =>
    auth.isGamePlayProfitAuthorized(gameAddress)
  );

  const approveGame = () => {
    if (isApproved) {
      auth.removeAuthorizedGame(gameAddress);
    } else {
      auth.addAuthorizedGame(gameAddress, utils.parseEther("0.05"));
    }
  };

  const toggleRng = () => {
    auth.editGameRngAuth(gameAddress, !isRngApproved);
  };

  const togglePlayProfit = async () => {
    auth.editGamePlayProfitAuth(gameAddress, !isPlayProfitApproved);
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul role="list" className="divide-y divide-gray-200">
        <Toggle
          title="Protocol Approved"
          enabled={Boolean(isApproved)}
          onChange={approveGame}
        />
        <Toggle
          title="RNG Approved"
          enabled={Boolean(isRngApproved)}
          onChange={toggleRng}
        />
        <Toggle
          title="Play Profit Approved"
          enabled={Boolean(isPlayProfitApproved)}
          onChange={togglePlayProfit}
        />
      </ul>
    </div>
  );
};

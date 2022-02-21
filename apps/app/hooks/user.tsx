import { authorizationProvider } from "tranport/protocol";
import * as React from "react";
import { useAccount } from "wagmi";
import useSWR from "swr";
import { signOut } from "next-auth/react";
import { createStateContext } from "react-use";

const [hook, Provider] = createStateContext(false);

export const useIsStaff = (forceLogout = false) => {
  const auth = authorizationProvider();

  const [{ data: accountData }] = useAccount();
  const { data, error } = useSWR("is-staff", () =>
    auth.isStaff(accountData?.address!)
  );

  React.useEffect(() => {
    if (!data && !error && forceLogout) {
      signOut();
    }
  }, [data]);

  return data;
};

export const useConnectModal = hook;
export const ConnectModalProvider = Provider;

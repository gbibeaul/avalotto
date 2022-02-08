import { authorizationProvider } from "tranport/authorization";
import * as React from "react";
import { useAccount } from "wagmi";
import useSWR from "swr";
import { signOut } from "next-auth/react";

export const useIsStaff = (forceLogout = false) => {
  const auth = authorizationProvider();

  const [{ data: accountData }] = useAccount();
  const { data, error } = useSWR(accountData?.address, auth.isStaff);

  React.useEffect(() => {
    if (!data && !error && forceLogout) {
      signOut();
    }
  }, [data]);

  return data;
};

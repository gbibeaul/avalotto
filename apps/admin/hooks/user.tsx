import { authorizationProvider } from "tranport/authorization";
import * as React from "react";
import { useAccount } from "wagmi";

export const useIsStaff = () => {
  const [{ data: accountData }] = useAccount();
  const [isStaff, setIsStaff] = React.useState();

  const updateIsStaff = async () => {
    if (accountData?.address) {
      const auth = await authorizationProvider();
      const isStaffRes = await auth.isStaff(accountData.address);
      setIsStaff(isStaffRes);
    }
  };

  React.useEffect(() => {
    updateIsStaff();
  }, [accountData?.address]);

  return isStaff;
};

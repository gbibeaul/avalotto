import useSWR from "swr";
import { authorizationProvider } from "tranport/protocol";

export const useIsGameAuthorized = (gameName: string) => {
  const auth = authorizationProvider();
  return useSWR(gameName, auth.isGameAuthorized).data;
};

export const useIsGameRngAuthorized = (gameName: string) => {
  const auth = authorizationProvider();
  return useSWR(gameName, auth.isGameRngAuthorized).data;
};

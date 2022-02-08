import type { NextApiRequest, NextApiResponse } from "next";
import config from "@gamble/config";
import { isNetwork, Network, isContractInConfig } from "utils/config.utils";

const games = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET": {
      if (!isNetwork(process.env.NEXT_PUBLIC_AVALANCHE_NETWORK)) {
        res.status(400).json({
          error: "Invalid network",
        });
        return;
      }
      const network: Network = process.env.NEXT_PUBLIC_AVALANCHE_NETWORK;

      const { gameId } = req.query;

      if (gameId) {
        const gameStr = gameId.toString();

        if (isContractInConfig(gameStr)) {
          return res
            .status(200)
            .json({ ...config[network].contracts[gameStr] });
        }

        return res.status(400);
      }

      console.log(config[network].contracts);

      const games = Object.values(config[network].contracts).filter(
        (contract) => contract.contractType === "Game"
      );

      return res.status(200).json(games);
    }

    default:
      res.status(405).end();
      return;
  }
};

export default games;

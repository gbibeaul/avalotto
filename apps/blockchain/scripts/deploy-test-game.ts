import fs from "fs-extra";

import { deployGameInstance } from "./deployers";

const CONFIG_PATH = "../../packages/config/config.json";

const deployTestgame = async () => {
  const network = process.env.HARDHAT_NETWORK;
  const config = await fs.readJson(CONFIG_PATH);

  const treasuryAddress = config[network!].contracts.Treasury.address;
  const authAddress = config[network!].contracts.GamebitAuthorizations.address;
  const auditorAddress = config[network!].contracts.Auditor.address;

  const gameInstance = await deployGameInstance(
    treasuryAddress,
    authAddress,
    auditorAddress
  );

  if (network === "Avalanche" || network === "Fuji") {
    console.log(gameInstance.address);
    config[network].contracts.TestGame.address = gameInstance.address;
    await fs.writeJson(CONFIG_PATH, config);
  }
};

deployTestgame()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

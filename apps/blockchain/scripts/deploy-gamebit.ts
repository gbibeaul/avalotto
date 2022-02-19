import fs from "fs-extra";

import {
  deployToken,
  deployAuthorization,
  deployGovernance,
  deployTreasury,
  deployGameInstance,
  deployAuditor,
} from "./deployers";

const CONFIG_PATH = "../../packages/config/config.json";

const deployGamebit = async () => {
  const network = process.env.HARDHAT_NETWORK;
  const config = await fs.readJson(CONFIG_PATH);

  const token = await deployToken();
  const governance = await deployGovernance(token.address);
  const authorization = await deployAuthorization(token.address);
  const treasury = await deployTreasury(authorization.address);
  const auditor = await deployAuditor(authorization.address);

  if (network === "Avalanche" || network === "Fuji") {
    config[network].contracts.GBIT.address = token.address;
    config[network].contracts.Governance.address = governance.address;
    config[network].contracts.GamebitAuthorizations.address =
      authorization.address;
    config[network].contracts.Treasury.address = treasury.address;
    config[network].contracts.Auditor.address = auditor.address;

    await fs.writeJson(CONFIG_PATH, config);
  }
};

deployGamebit()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

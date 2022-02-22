import fs from "fs-extra";
import { ethers } from "hardhat";

import { GameInstance__factory } from "../typechain";

const CONFIG_PATH = "../../packages/config/config.json";

const placetestBet = async () => {
  const [signer] = await ethers.getSigners();
  const network = process.env.HARDHAT_NETWORK;
  const config = await fs.readJson(CONFIG_PATH);

  const treasuryAddress = config[network!].contracts.Treasury.address;

  const gameInstance = GameInstance__factory.connect(treasuryAddress, signer);

  console.log(signer.address);

  const tx = await gameInstance.functions.play({
    value: ethers.utils.parseEther("1"),
    gasLimit: ethers.BigNumber.from(1000000),
  });

  await tx.wait();
};

placetestBet()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

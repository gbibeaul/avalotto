import { ethers } from "hardhat";
import fs from "fs-extra";

const CONFIG_PATH = "../../packages/config/config.json";

async function main() {
  const [owner, trusted] = await ethers.getSigners();

  const Lotto = await ethers.getContractFactory("Lotto");
  const lotto = await Lotto.deploy(trusted.address, owner.address);

  await lotto.deployed();

  const config = await fs.readJson(CONFIG_PATH);
  config.dev.contracts.Lotto.address = lotto.address;

  await fs.writeJson(CONFIG_PATH, config, { spaces: 2 });

  console.log("Lotto deployed to:", lotto.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

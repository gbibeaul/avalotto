import { ethers } from "hardhat";
import fs from "fs-extra";

const CONFIG_PATH = "../../packages/config/config.json";

async function main() {
  const [owner, trusted] = await ethers.getSigners();

  const Lotto = await ethers.getContractFactory("LottoWinnerMock");
  const lotto = await Lotto.deploy(trusted.address, owner.address, ethers.utils.parseEther("1"));

  await lotto.deployed();

  const config = await fs.readJson(CONFIG_PATH);
  config.Local.contracts.LottoWinnerMock.address = lotto.address;
  config.Local.contracts.LottoWinnerMock.owner = owner.address;
  config.Local.contracts.LottoWinnerMock.trustedEntity = trusted.address;

  await fs.writeJson(CONFIG_PATH, config, { spaces: 2 });

  console.log("LottoWinnerMock deployed to:", lotto.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

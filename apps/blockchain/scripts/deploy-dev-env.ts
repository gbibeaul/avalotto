//@ts-nocheck
import { ethers, upgrades } from "hardhat";
import fs from "fs-extra";

const CONFIG_PATH = "../../packages/config/config.json";

/**
 * Each contract has some dependencies. Some depends on other contracts so they are deploy in a specific order
 * gamble token
 * governance
 * treasury
 * any games
 */
async function main() {
  const config = await fs.readJson(CONFIG_PATH);

  const [owner, cashier] = await ethers.getSigners();

  const Gamble = await ethers.getContractFactory("GAMBLEToken");
  const Governance = await ethers.getContractFactory("GambleGovernance");
  const Treasury = await ethers.getContractFactory("Treasury");
  const Lotto = await ethers.getContractFactory("LottoWinnerMock");
  const GamebitAuthorization = await ethers.getContractFactory("GamebitAuthorization");

  /** deploy the token and update config
   *  constructor args: supply, operators
   */
  const gamble = await upgrades.deployProxy(Gamble, [
    ethers.BigNumber.from(10000000),
    [],
  ]);
  await gamble.deployed();
  config.Local.contracts.Gamble.owner = owner.address;
  config.Local.contracts.Gamble.address = gamble.address;

  /** deploy the DAO governance
   *  constructor args: token address
   */
  const governance = await Governance.deploy(gamble.address);
  await governance.deployed();
  config.Local.contracts.Governance.owner = owner.address;
  config.Local.contracts.Governance.address = gamble.address;

  const gamebitAuthorization = await GamebitAuthorization.deploy(governance.address);
  await gamebitAuthorization.deployed();
  config.Local.contracts.GamebitAuthorization.owner = owner.address;
  config.Local.contracts.GamebitAuthorization.address = gamebitAuthorization.address;

  /** deploy treasury
   *  contrustor args: cashiers address array, governance address
   */
  const treasury = await Treasury.deploy(gamebitAuthorization.address);
  await treasury.deployed();
  config.Local.contracts.Treasury.owner = owner.address;
  config.Local.contracts.Treasury.address = gamble.address;

  /** deploy lottery
   * constructor args: trusted party address, treasury address, ticket price
   */
  const lotto = await Lotto.deploy(
    owner.address,
    treasury.address,
    ethers.utils.parseEther("1"),
    ethers.BigNumber.from(1),
    ethers.BigNumber.from(3)
  );
  await lotto.deployed();
  config.Local.contracts.LottoWinnerMock.address = lotto.address;
  config.Local.contracts.LottoWinnerMock.owner = owner.address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

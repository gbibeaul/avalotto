//@ts-nocheck
import { ethers, upgrades } from "hardhat";
import fs from "fs-extra";

const CONFIG_PATH = "../../packages/config/config.json";

// token
// governance  => token
// GamebitAuthorizations => governance
// treasury  => authorization, rngFee
// infra => authorization

async function main() {
  const config = await fs.readJson(CONFIG_PATH);

  const [owner, cashier] = await ethers.getSigners();

  const Gamble = await ethers.getContractFactory("GamebitToken");
  const Governance = await ethers.getContractFactory("GamebitGovernance");
  const Authorization = await ethers.getContractFactory(
    "GamebitAuthorizations"
  );
  const Treasury = await ethers.getContractFactory("GamebitTreasury");
  const Infra = await ethers.getContractFactory("GamebitInfra");

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

  /** Deploy auth contract
   * constructor args: governance address
   */
  const gamebitAuthorization = await Authorization.deploy(governance.address);
  await gamebitAuthorization.deployed();

  config.Local.contracts.GamebitAuthorizations.owner = owner.address;
  config.Local.contracts.GamebitAuthorizations.address =
    gamebitAuthorization.address;

  /** deploy treasury
   *  contrustor args: governance address, rngFee
   */
  const treasury = await Treasury.deploy(gamebitAuthorization.address, ethers.BigNumber.from('1'));
  await treasury.deployed();
  config.Local.contracts.Treasury.owner = owner.address;
  config.Local.contracts.Treasury.address = gamble.address;

  /** deploy Infra
   *  contrustor args: governance address
   */
const infra = await Infra.deploy(gamebitAuthorization.address);
await infra.deployed();
config.Local.contracts.Infra.owner = owner.address;
config.Local.contracts.Infra.address = infra.address;
}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

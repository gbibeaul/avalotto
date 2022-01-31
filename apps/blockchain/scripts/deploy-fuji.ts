//@ts-nocheck
import { ethers } from "hardhat";
import fs from "fs-extra";

const CONFIG_PATH = "../../packages/config/config.json";

const mineEmptyBlocks = async (numberOfBlocks: number) => {
  for (let i = 0; i < numberOfBlocks; i++) {
    await ethers.provider.send("evm_mine", []);
  }
};

export const deployToken = async () => {
  const GMBT = await ethers.getContractFactory("GamebitToken");

  /** deploy the token
   *  constructor args: supply
   */

  const gmbt = await GMBT.deploy(ethers.BigNumber.from(10000000));
  await gmbt.deployed();
  return gmbt;
};

export const deployGovernance = async (gbmtAddress) => {
  const Governance = await ethers.getContractFactory("GamebitGovernance");

  /** deploy the DAO governance
   *  constructor args: token address
   */
  const governance = await Governance.deploy(gbmtAddress);
  await governance.deployed();

  return governance;
};

export const deployAuthorization = async (governanceAddress) => {
  const Authorization = await ethers.getContractFactory(
    "GamebitAuthorizations"
  );

  /** Deploy auth contract
   * constructor args: governance address
   */
  const gamebitAuthorization = await Authorization.deploy(governanceAddress);
  await gamebitAuthorization.deployed();

  return gamebitAuthorization;
};

export const deployTreasury = async (authorisationAddress, rngFee) => {
  const Treasury = await ethers.getContractFactory("GamebitTreasury");

  /** deploy treasury
   *  contrustor args: governance address, rngFee
   */
  const treasury = await Treasury.deploy(
    authorisationAddress,
    ethers.BigNumber.from(rngFee)
  );
  await treasury.deployed();

  return treasury;
};

export const deployInfra = async (authorisationAddress) => {
  const Infra = await ethers.getContractFactory("GamebitInfra");

  /** deploy Infra
   *  contrustor args: governance address
   */
  const infra = await Infra.deploy(authorisationAddress);
  await infra.deployed();

  return infra;
};

export const deployGamebit = async () => {
  const config = await fs.readJson(CONFIG_PATH);

  const [owner] = await ethers.getSigners();

  const gbmt = await deployToken();
  const governance = await deployGovernance(gbmt.address);
  const gamebitAuthorization = await deployAuthorization(governance.address);
  const treasury = await deployTreasury(
    gamebitAuthorization.address,
    ethers.BigNumber.from("1")
  );
  const infra = await deployInfra(gamebitAuthorization.address);

  // in Fuji the owner provides the RNG oracles but that should never be the case in prod
  gamebitAuthorization.functions.changeRng(owner);

  config.Fuji.contracts.GMBT.owner = owner.address;
  config.Fuji.contracts.GMBT.address = gbmt.address;

  config.Fuji.contracts.Governance.owner = owner.address;
  config.Fuji.contracts.Governance.address = governance.address;

  config.Fuji.contracts.GamebitAuthorizations.owner = owner.address;
  config.Fuji.contracts.GamebitAuthorizations.address =
    gamebitAuthorization.address;

  config.Fuji.contracts.Treasury.owner = owner.address;
  config.Fuji.contracts.Treasury.address = treasury.address;

  config.Fuji.contracts.Infra.owner = owner.address;
  config.Fuji.contracts.Infra.address = infra.address;

  await fs.writeJson(CONFIG_PATH, config, { spaces: 2 });
  return {
    gbmt,
    governance,
    gamebitAuthorization,
    treasury,
    infra,
  };
};

export const setupGame = async () => {
  const [owner] = await ethers.getSigners();

  const config = await fs.readJson(CONFIG_PATH);

  const { gamebitAuthorization, treasury, infra } = await deployGamebit();

  const Lotto = await ethers.getContractFactory("LottoMockWinner");
  const lotto = await Lotto.deploy(
    treasury.address,
    gamebitAuthorization.address,
    infra.address,
    owner.address,
    ethers.utils.parseEther("1"),
    ethers.BigNumber.from(7)
  );
  await lotto.deployed();

  await gamebitAuthorization.functions.addAuthorizedGame(
    lotto.address,
    ethers.utils.parseEther("0.05")
  );

  await gamebitAuthorization.functions.editGamePlayProfitAuth(
    lotto.address,
    true
  );

  config.Fuji.contracts.LottoWinnerMock.owner = owner.address;
  config.Fuji.contracts.LottoWinnerMock.trustedParty = lotto.address;
  config.Fuji.contracts.LottoWinnerMock.address = lotto.address;

  await gamebitAuthorization.functions.editGameRngAuth(lotto.address, true);

  await gamebitAuthorization.functions.changeRng(owner.address);

  await fs.writeJson(CONFIG_PATH, config, { spaces: 2 });
};

setupGame()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

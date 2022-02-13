//@ts-nocheck
import { ethers } from "hardhat";
import fs from "fs-extra";

const CONFIG_PATH = "../../packages/config/config.json";

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
  console.log("hello");

  const [owner] = await ethers.getSigners();
  console.log(await owner.getBalance());

  const gbmt = await deployToken();
  const governance = await deployGovernance(gbmt.address);
  const gamebitAuthorization = await deployAuthorization(governance.address);
  const treasury = await deployTreasury(
    gamebitAuthorization.address,
    ethers.BigNumber.from("1")
  );
  const infra = await deployInfra(gamebitAuthorization.address);

  config.Fuji.contracts.GMBT.owner = owner.address;
  config.Fuji.contracts.GMBT.address = gbmt.address;
  console.log(config.Fuji.contracts.GMBT);

  config.Fuji.contracts.Governance.owner = owner.address;
  config.Fuji.contracts.Governance.address = governance.address;
  console.log(config.Fuji.contracts.Governance);

  config.Fuji.contracts.GamebitAuthorizations.owner = owner.address;
  config.Fuji.contracts.GamebitAuthorizations.address =
    gamebitAuthorization.address;
  console.log(config.Fuji.contracts.GamebitAuthorizations);

  config.Fuji.contracts.Treasury.owner = owner.address;
  config.Fuji.contracts.Treasury.address = treasury.address;
  console.log(config.Fuji.contracts.Treasury);

  config.Fuji.contracts.Infra.owner = owner.address;
  config.Fuji.contracts.Infra.address = infra.address;
  console.log(config.Fuji.contracts.Infra);

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

  config.Fuji.contracts.LottoWinnerMock.owner = owner.address;
  config.Fuji.contracts.LottoWinnerMock.trustedParty = lotto.address;
  config.Fuji.contracts.LottoWinnerMock.address = lotto.address;

  await fs.writeJson(CONFIG_PATH, config, { spaces: 2 });
};

deployGamebit()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

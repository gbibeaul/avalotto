//@ts-nocheck
import { ethers } from "hardhat";
import fs from "fs-extra";

const CONFIG_PATH = "../../packages/config/config.json";

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

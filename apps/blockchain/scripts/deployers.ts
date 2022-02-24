import { BigNumber } from "ethers";
import { ethers } from "hardhat";
import {
  GameInstance,
  GamebitAuthorizations,
  GamebitGovernance,
  GamebitToken,
  Auditor,
  GamebitTreasury,
  GameBitNFT,
} from "../typechain";

export const deployToken = async (): Promise<GamebitToken> => {
  const GBIT = await ethers.getContractFactory("GamebitToken");
  const token = await GBIT.deploy(ethers.BigNumber.from(10000000));
  await token.deployed();
  return token as GamebitToken;
};

export const deployGovernance = async (
  gbmtAddress: string
): Promise<GamebitGovernance> => {
  const Governance = await ethers.getContractFactory("GamebitGovernance");

  const governance = await Governance.deploy(gbmtAddress);
  await governance.deployed();

  return governance as GamebitGovernance;
};

export const deployAuthorization = async (
  governanceAddress: string
): Promise<GamebitAuthorizations> => {
  const Authorization = await ethers.getContractFactory(
    "GamebitAuthorizations"
  );

  const gamebitAuthorization = await Authorization.deploy(governanceAddress);
  await gamebitAuthorization.deployed();

  return gamebitAuthorization as GamebitAuthorizations;
};

export const deployTreasury = async (
  authorisationAddress: string
): Promise<GamebitTreasury> => {
  const Treasury = await ethers.getContractFactory("GamebitTreasury");

  const treasury = await Treasury.deploy(
    authorisationAddress,
    ethers.utils.parseEther("0.01")
  );
  await treasury.deployed();

  return treasury as GamebitTreasury;
};

export const deployAuditor = async (
  authorisationAddress: string
): Promise<Auditor> => {
  const Auditor = await ethers.getContractFactory("Auditor");

  const auditor = await Auditor.deploy(authorisationAddress);
  await auditor.deployed();

  return auditor as Auditor;
};

export const deployGameInstance = async (
  treasuryAddress: string,
  authAddress: string,
  auditorAddress: string
): Promise<GameInstance> => {
  const game = await ethers.getContractFactory("GameInstance");

  const gameInstance = await game.deploy(
    treasuryAddress,
    authAddress,
    auditorAddress
  );
  await gameInstance.deployed();

  return gameInstance as GameInstance;
};

export const deployGameBitNFT = async (): Promise<GameBitNFT> => {
  const GameBitNFTFactory = await ethers.getContractFactory("GameBitNFT");

  const GameBitNFTF = await GameBitNFTFactory.deploy();

  await GameBitNFTF.deployed();

  return GameBitNFTF as GameBitNFT;
};

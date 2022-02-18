import { Signer, utils } from "ethers";
import {
  deployToken,
  deployAuthorization,
  deployGovernance,
} from "../scripts/deployers";
import { mineEmptyBlocks } from "./helpers";
import {
  GamebitAuthorizations,
  GamebitGovernance,
  GamebitToken,
} from "../typechain";
const { ethers } = require("hardhat");

let deployerStaff: Signer;
let extraStaff: Signer;
let nonStaff: Signer;
let Token: GamebitToken;
let Authorization: GamebitAuthorizations;
let Governance: GamebitGovernance;

beforeEach(async function () {
  [deployerStaff, extraStaff, nonStaff] = await ethers.getSigners();
  Token = await deployToken();
  Governance = await deployGovernance(Token.address);
  Authorization = await deployAuthorization(Token.address);
});

describe("Governance", () => {
  it("Refuses to add a staff if you are not already staff", async () => {
    const extraStaffAddress = await extraStaff.getAddress();
    expect(
      Authorization.connect(nonStaff).addStaff(extraStaffAddress)
    ).rejects.toThrow();
  });

  it("Accepts a staff member when the tx is submited by an existing staff", async () => {
    const extraStaffAddress = await extraStaff.getAddress();
    await Authorization.connect(deployerStaff).addStaff(extraStaffAddress);

    const isStaff = await Authorization.isStaff(extraStaffAddress);
    expect(isStaff).toBe(true);
  });

  it("lets the staff add and remove a game", async () => {
    const gameAddress = "0x0000000000000000000000000000000000000001";

    await Authorization.connect(deployerStaff).addAuthorizedGame(
      gameAddress,
      utils.parseEther("0.05")
    );

    // console.log(Authorization.functions);

    const isAuthorized = await Authorization.isGameAuthorized(gameAddress);
    expect(isAuthorized).toBe(true);

    await Authorization.connect(deployerStaff).removeAuthorizedGame(
      gameAddress
    );

    const isAuthorized2 = await Authorization.isGameAuthorized(gameAddress);

    expect(isAuthorized2).toBe(false);
  });

  // write a test that adds a game than changes the profit margin
  it("Lets the staff change a profit margin", async () => {
    const gameAddress = "0x0000000000000000000000000000000000000001";

    await Authorization.connect(deployerStaff).addAuthorizedGame(
      gameAddress,
      utils.parseEther("0.05")
    );

    await Authorization.connect(deployerStaff).updateGameMinProfit(
      gameAddress,
      utils.parseEther("0.1")
    );

    const minProfit = await Authorization.getMinGameProfit(gameAddress);

    await mineEmptyBlocks(1);

    expect(minProfit.toHexString()).toEqual(utils.parseEther("0.1")._hex);
  });

  it("lets the staff update addresses of the protocol's components", async () => {
    const rngAddress = "0x0000000000000000000000000000000000000001";

    await Authorization.connect(deployerStaff).changeRng(rngAddress);

    await mineEmptyBlocks(2);

    const isRng = await Authorization.isOfficialRng(rngAddress);

    expect(isRng).toEqual(true);
  });
});

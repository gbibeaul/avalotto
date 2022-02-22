import { BigNumber, Signer, utils } from "ethers";
import {
  deployToken,
  deployAuthorization,
  deployGovernance,
  deployTreasury,
  deployGameInstance,
  deployAuditor,
} from "../scripts/deployers";
import { mineEmptyBlocks } from "./helpers";
import {
  GamebitAuthorizations,
  GamebitGovernance,
  GamebitToken,
  GamebitTreasury,
  GameInstance,
  Auditor,
} from "../typechain";
import exp from "constants";
const { ethers } = require("hardhat");

// signers
let deployerStaff: Signer;
let extraStaff: Signer;
let nonStaff: Signer;

// protocol
let token: GamebitToken;
let authorization: GamebitAuthorizations;
let governance: GamebitGovernance;
let treasury: GamebitTreasury;
let auditor: Auditor;

// test game
let Game: GameInstance;

beforeEach(async function () {
  [deployerStaff, extraStaff, nonStaff] = await ethers.getSigners();

  token = await deployToken();
  governance = await deployGovernance(token.address);
  authorization = await deployAuthorization(token.address);
  treasury = await deployTreasury(authorization.address);
  auditor = await deployAuditor(authorization.address);

  Game = await deployGameInstance(
    treasury.address,
    authorization.address,
    auditor.address
  );

  authorization.addAuthorizedGame(Game.address, utils.parseEther("0.05"));
  await mineEmptyBlocks(1);
  authorization.editGamePlayProfitAuth(Game.address, true);
  await mineEmptyBlocks(1);
  authorization.editGameRngAuth(Game.address, true);
  await mineEmptyBlocks(1);
  authorization.functions.changeRng(await deployerStaff.getAddress());
  await mineEmptyBlocks(1);
});

describe("Gamebit Game", () => {
  it("Accepts bets", async () => {
    await Game.connect(nonStaff).play({ value: BigNumber.from(1) });
    const balance = await Game.getJackpot();
    expect(balance).toEqual(utils.parseEther("0.95"));
  });

  it("requests an RNG when the draw is called", async () => {
    await Game.connect(nonStaff).play({ value: BigNumber.from(1) });
    await mineEmptyBlocks(1);
    await Game.connect(nonStaff).play({ value: BigNumber.from(1) });
    await mineEmptyBlocks(1);

    const test = await auditor.functions.getRequest(BigNumber.from(1));

    expect(test[0][0]).toEqual(Game.address);
  });
});

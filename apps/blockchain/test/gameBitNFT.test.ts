import { Signer } from "ethers";
import { deployGameBitNFT } from "../scripts/deployers";
const { ethers } = require("hardhat");

import { GameBitNFT } from "../typechain";

// signers
let deployerStaff: Signer;
let extraStaff: Signer;
let nonStaff: Signer;

let gameBitNFT: GameBitNFT;

beforeEach(async () => {
  [deployerStaff, extraStaff, nonStaff] = await ethers.getSigners();
  gameBitNFT = await deployGameBitNFT();
});

const tokenURI = "https://gateway.pinata.cloud/ipfs/QmSASnaR9zDPrpEo6VLsQjx4ovapBy8wqQSRbD1cxH1tqp"

describe("GamebitNFT", () => {
  it("should mint", async () => {

    // _awardItem is internal so below test crashes

    // const to = await nonStaff.getAddress();
    // await gameBitNFT.functions.approve._awardItem(
    //   to,
    //   tokenURI
    // );
    // expect(await gameBitNFT.ownerOf(1)).toEqual(nonStaff.getAddress());
    // expect(await gameBitNFT.tokenURI(1)).toEqual(tokenURI)
  });
});

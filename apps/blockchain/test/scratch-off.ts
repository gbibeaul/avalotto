import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { text } from "stream/consumers";
const { ethers } = require("hardhat");

chai.use(chaiAsPromised);

const ScratchOffStatus = {
  Minted: 0,
  Scratched: 1,
  Redeemed: 2,
};

async function listerForMint(scratchOff: any) {
  scratchOff.removeAllListeners();

  return new Promise((resolve) => {
    scratchOff.on("Transfer", (...args: any) => resolve(args));
  });
}

describe("Scratch Off", () => {
  it.only("mocked", async () => {
    const ScratchOff = await ethers.getContractFactory("ScratchOffCard");
    const scratchOff = await ScratchOff.deploy();

    const onMint = listerForMint(scratchOff);
    await scratchOff.mint().then((tx: any) => tx.wait());
    const evt = (await onMint) as any[];
    const tokenId: Number = evt[2];
    expect(tokenId).to.equal("0");
    expect(await scratchOff.getStatus(ethers.BigNumber.from(tokenId))).to.equal(
      ScratchOffStatus.Minted
    );

    await scratchOff
      .scratch(ethers.BigNumber.from(0))
      .then((tx: any) => tx.wait());
    expect(await scratchOff.getStatus(ethers.BigNumber.from(tokenId))).to.equal(
      ScratchOffStatus.Scratched
    );

    const balls = await scratchOff.getBalls(ethers.BigNumber.from(tokenId));
    expect(balls.length).to.equal(9);

    for (let i = 0; i < 9; i++) {
      expect(balls[i]).to.equal(i + 1);
    }

    await scratchOff
      .redeem(ethers.BigNumber.from(tokenId))
      .then((tx: any) => tx.wait());
    expect(await scratchOff.getStatus(ethers.BigNumber.from(tokenId))).to.equal(
      ScratchOffStatus.Redeemed
    );
  });
});

import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
const { ethers } = require("hardhat");

chai.use(chaiAsPromised);

const ScratchOffStatus = {
  Minted: 0,
  Scratched: 1,
  Redeemed: 2,
};

describe("Scratch Off", () => {
  it.only("mocked", async () => {
    const ScratchOff = await ethers.getContractFactory("ScratchOff");
    const scratchOff = await ScratchOff.deploy();

    const onMint = new Promise((resolve) => {
      scratchOff.on("Minted", resolve);
    });

    await scratchOff.mint();
    const tokenId = await onMint;
    expect(tokenId).to.equal("0");
    expect(await scratchOff.getStatus(ethers.BigNumber.from(0))).to.equal(
      ScratchOffStatus.Minted
    );

    await scratchOff.scratch(ethers.BigNumber.from(0));
    expect(await scratchOff.getStatus(ethers.BigNumber.from(1))).to.equal(
      ScratchOffStatus.Scratched
    );

    const balls = await scratchOff.getBalls(ethers.BigNumber.from(0));
    expect(balls.length).to.equal(9);

    for (let i = 0; i < 9; i++) {
      expect(balls[i]).to.equal(i + 1);
    }

    await scratchOff.redeem(ethers.BigNumber.from(0));
    expect(await scratchOff.getStatus(ethers.BigNumber.from(2))).to.equal(
      ScratchOffStatus.Redeemed
    );
  });
});

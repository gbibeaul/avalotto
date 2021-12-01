import { BigNumber } from "@ethersproject/bignumber";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { ethers, network } from "hardhat";

chai.use(chaiAsPromised);

const getDeployedContract = async () => {
  const [owner, trusted, nonTrusted] = await ethers.getSigners();

  const Lotto = await ethers.getContractFactory("Lotto");
  const lotto = await Lotto.deploy(trusted.address);

  await lotto.deployed();
  return lotto;
};

const mineEmptyBlocks = async (numberOfBlocks: number) => {
  for (let i = 0; i < numberOfBlocks; i++) {
    await ethers.provider.send("evm_mine", []);
  }
};

/**
 *
 */
describe("Lotto", async function () {
  it("Should deploy", async function () {
    const lotto = await getDeployedContract();
    expect(lotto.deployTransaction).to.have.property("hash");
  });

  it("Accepts the seed and reveal from the trusted address", async function () {
    const lotto = await getDeployedContract();
    const [owner, trusted, nonTrusted] = await ethers.getSigners();
    const seed = ethers.utils.id("hello234");

    await lotto.connect(trusted).functions.setSealedSeed(seed);
    await mineEmptyBlocks(1);

    const res = await lotto.connect(trusted).functions.reveal(seed);

    expect(res).to.have.property("hash");
  });

  it("It refuses the seed from anybody else than the trusted entity", async function () {
    const lotto = await getDeployedContract();
    const [owner, trusted, nonTrusted] = await ethers.getSigners();

    const seed = ethers.utils.id("hello234");

    const ownerSeeding = lotto.connect(nonTrusted).functions.reveal(seed);
    const unTrustedSeeding = lotto.connect(nonTrusted).functions.reveal(seed);

    expect(ownerSeeding).to.be.rejectedWith(Error);
    expect(unTrustedSeeding).to.be.rejectedWith(Error);
  });

  it("generates a draw of 3 numbers", async function () {
    const lotto = await getDeployedContract();
    const [owner, trusted, nonTrusted] = await ethers.getSigners();

    const seed = ethers.utils.id("hello234");
    await lotto.connect(trusted).functions.setSealedSeed(seed);
    await mineEmptyBlocks(1);
    await lotto.connect(trusted).functions.reveal(seed);

    const [draw] = await lotto.connect(trusted).functions.getLastDrawNumbers();

    // transform the draw from big number to array
    const drawArray = draw.map((number: BigNumber) => number.toNumber());
    expect(drawArray).to.have.lengthOf(3);
  });

  it("generates two different consecutive draws", async function () {
    const lotto = await getDeployedContract();
    const [owner, trusted, nonTrusted] = await ethers.getSigners();

    const seed1 = ethers.utils.id("hello234");
    await lotto.connect(trusted).functions.setSealedSeed(seed1);
    await mineEmptyBlocks(1);
    await lotto.connect(trusted).functions.reveal(seed1);

    const [draw1] = await lotto.connect(trusted).functions.getLastDrawNumbers();

    const seed2 = ethers.utils.id("hello2345");
    await lotto.connect(trusted).functions.setSealedSeed(seed2);
    await mineEmptyBlocks(1);
    await lotto.connect(trusted).functions.reveal(seed2);

    const [draw2] = await lotto.connect(trusted).functions.getLastDrawNumbers();

    expect(draw1).to.not.deep.equal(draw2);
  });
});

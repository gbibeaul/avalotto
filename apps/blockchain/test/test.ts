import { BigNumber } from "@ethersproject/bignumber";
import { Contract } from "@ethersproject/contracts";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { ethers, network } from "hardhat";

chai.use(chaiAsPromised);

const getDeployedContract = async (mock: boolean = false) => {
  const [owner, trusted] = await ethers.getSigners();

  const Lotto = await ethers.getContractFactory(
    mock ? "LottoWinnerMock" : "Lotto"
  );
  const lotto = await Lotto.deploy(trusted.address, owner.address, ethers.utils.parseEther("1"));

  await lotto.deployed();
  return lotto;
};

const mineEmptyBlocks = async (numberOfBlocks: number) => {
  for (let i = 0; i < numberOfBlocks; i++) {
    await ethers.provider.send("evm_mine", []);
  }
};

const betMultipleBadBets = async (lotto: Contract, numOfBets: number) => {
  const [_, __, nonTrusted1, nonTrusted2] = await ethers.getSigners();
  const numbers = [77, 22, 33].map((x) => ethers.BigNumber.from(x));

  for (let i = 0; i < numOfBets; i++) {
    await lotto
      .connect(nonTrusted2)
      .functions.bet(numbers, { value: ethers.utils.parseEther("1") });
  }
};

describe("Lotto", async function () {
  it("Should deploy", async function () {
    const lotto = await getDeployedContract();
    expect(lotto.deployTransaction).to.have.property("hash");
  });

  it("Accepts the seed from the trusted party", async function () {
    const lotto = await getDeployedContract();
    const [owner, trusted, nonTrusted] = await ethers.getSigners();
    const seed = ethers.utils.id("hello234");

    const seedTx = await lotto.connect(trusted).functions.setSealedSeed(seed);

    expect(seedTx).to.have.property("hash");
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

  it("accepts bets", async function () {
    const lotto = await getDeployedContract();
    const [owner, trusted, nonTrusted] = await ethers.getSigners();

    const numbers = [1, 2, 3].map((x) => ethers.BigNumber.from(x));
    await lotto
      .connect(nonTrusted)
      .functions.bet(numbers, { value: ethers.utils.parseEther("1") });

    const [amountOfBets] = await lotto
      .connect(nonTrusted)
      .functions.getAmountOfBetForNumbers(numbers);

    expect(amountOfBets.toNumber()).to.equal(1);
  });

  it("refuses a bet from the trusted party", async function () {
    const lotto = await getDeployedContract();
    const [owner, trusted, nonTrusted] = await ethers.getSigners();

    const numbers = [1, 2, 3].map((x) => ethers.BigNumber.from(x));
    const bet = lotto
      .connect(trusted)
      .functions.bet(numbers, { value: ethers.utils.parseEther("1") });

    expect(bet).to.be.rejectedWith(Error);
  });

  it("refuses bets after the seed was sent", async function () {
    const lotto = await getDeployedContract();
    const [owner, trusted, nonTrusted] = await ethers.getSigners();

    const seed = ethers.utils.id("hello234");
    await lotto.connect(trusted).functions.setSealedSeed(seed);

    const numbers = [1, 2, 3].map((x) => ethers.BigNumber.from(x));
    const bet = lotto
      .connect(nonTrusted)
      .functions.bet(numbers, { value: ethers.utils.parseEther("1") });

    expect(bet).to.be.rejectedWith(Error);
  });

  it("accepts multiple bets", async function () {
    const lotto = await getDeployedContract();
    const [owner, trusted, nonTrusted1, nonTrusted2] =
      await ethers.getSigners();

    // place a first bet from account 1
    const numbers1 = [1, 2, 3].map((x) => ethers.BigNumber.from(x));
    await lotto
      .connect(nonTrusted1)
      .functions.bet(numbers1, { value: ethers.utils.parseEther("1") });

    // place a second bet from account 2
    const numbers2 = [4, 5, 6].map((x) => ethers.BigNumber.from(x));
    await lotto.connect(nonTrusted2).functions.bet(numbers2, {
      value: ethers.utils.parseEther("1"),
    });

    // place the same bet from account 2
    await lotto.connect(nonTrusted2).functions.bet(numbers1, {
      value: ethers.utils.parseEther("1"),
    });

    const [amountOfBets] = await lotto
      .connect(nonTrusted1)
      .functions.getAmountOfBetForNumbers(numbers1);

    const [amountOfBets2] = await lotto
      .connect(nonTrusted2)
      .functions.getAmountOfBetForNumbers(numbers2);

    expect(amountOfBets.toNumber()).to.equal(2);
    expect(amountOfBets2.toNumber()).to.equal(1);
  });
});

/**
 * This test is critical there is no way to simulate properly a draw since there is pseudo randomness involved
 * For this test to run, _getLotteryResults in Lotto.sol must be mocked to return the numbers 1, 2, 3
 * TODO isolate payout logic in different contract to test easier
 */
describe("Lotto contract payment", async function () {
  it("pays out the sole winner 95% of the jackpot and keeps 5% for the treasury", async function () {
    await network.provider.request({
      method: "hardhat_reset",
      params: [],
    });
    const lotto = await getDeployedContract(true);
    const [owner, trusted, nonTrusted1, nonTrusted2] =
      await ethers.getSigners();

    // place a first bet from account 1
    const numbers1 = [1, 2, 3].map((x) => ethers.BigNumber.from(x));
    await lotto
      .connect(nonTrusted1)
      .functions.bet(numbers1, { value: ethers.utils.parseEther("1") });

    // placing wrong bets to see a difference in the balance after payment
    await betMultipleBadBets(lotto, 19);

    // set the seeds and reveal the numbers this automatically pays out the bet
    const seed = ethers.utils.id("hello234");
    await lotto.connect(trusted).functions.setSealedSeed(seed);
    await mineEmptyBlocks(1);
    await lotto.connect(trusted).functions.reveal(seed);
    const test = await lotto.getLastDrawNumbers()

    await mineEmptyBlocks(1);

    const succesfulBetBalanceAfterDraw = await ethers.provider.getBalance(
      nonTrusted1.address
    );

    const badBetBalance = await ethers.provider.getBalance(nonTrusted2.address);
    const ownerBalanceAfterDraw = await ethers.provider.getBalance(
      owner.address
    );


    // the balance of the winning account should be increased by 95% of the jackpot.
    // starting balance of 10,000, 1 bet, winning 19 units should round up to 10018 after gas
    expect(
      Math.ceil(+ethers.utils.formatEther(succesfulBetBalanceAfterDraw))
    ).to.equal(10018);

    // the balance of the treasury starts at 10,000, gas fee for deploying, should receive 5% of the jackpot
    // should be 10,001 after gas
    expect(
      Math.ceil(+ethers.utils.formatEther(ownerBalanceAfterDraw))
    ).to.equal(10001);

    // balance of bad better was 10,000, placed 19 bad bets + paid gas, should ceil to 9981
    expect(Math.ceil(+ethers.utils.formatEther(badBetBalance))).to.equal(9981);
  });
});

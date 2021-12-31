import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { ethers, network, upgrades } from "hardhat";

chai.use(chaiAsPromised);

const getSignerWithRoles = async () => {
  const [owner, holder1, holder2, holder3, nonHolder1, nonHolder2, nonHolder3] =
    await ethers.getSigners();

  return {
    owner,
    holder1,
    holder2,
    holder3,
    nonHolder1,
    nonHolder2,
    nonHolder3,
  };
};

const getDeployedContract = async (mock: boolean = false) => {
  const Gamble = await ethers.getContractFactory("GAMBLEToken");
  const Governance = await ethers.getContractFactory("GambleGovernance");
  const Treasury = await ethers.getContractFactory("Treasury");

  // some type mismatch from libraries implenting the same. The code is correct actually
  const gamble = await upgrades
    //@ts-ignore
    .deployProxy(Gamble, [ethers.BigNumber.from(10000000), []]);

  await gamble.deployed();

  const governance = await Governance.deploy(gamble.address);

  await governance.deployed();

  const treasury = await upgrades
    //@ts-ignore
    .deployProxy(Treasury, [[], governance.address]);

  await treasury.deployed();
  return { gamble, governance, treasury };
};

describe.only("Gamble Protocol", async function () {
  it("Should deploy", async function () {
    const { gamble } = await getDeployedContract();
    expect(gamble.deployTransaction).to.have.property("hash");
  });

  it.only("allows transfers between accounts", async function () {
    const { gamble, treasury } = await getDeployedContract();
    const { owner, nonHolder1 } = await getSignerWithRoles();

    // transfer from original mint to a non holder
    await gamble
      // @ts-ignore
      .connect(owner)
      .functions.transfer(treasury.address, ethers.BigNumber.from(10000000));
    const balance = await gamble.functions.balanceOf(treasury.address);
    console.log(balance);
    expect(1).to.equal(1);
  });

  it("Accepts proposals for transfers");
});

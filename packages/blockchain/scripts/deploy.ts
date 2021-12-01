import { ethers } from "hardhat";

async function main() {
  const Lotto = await ethers.getContractFactory("Lotto");
  const lotto = await Lotto.deploy();

  await lotto.deployed();

  console.log("Lotto deployed to:", lotto.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

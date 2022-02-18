import { ethers } from "hardhat";

export const mineEmptyBlocks = async (numberOfBlocks: number = 1) => {
  for (let i = 0; i < numberOfBlocks; i++) {
    await ethers.provider.send("evm_mine", []);
  }
};

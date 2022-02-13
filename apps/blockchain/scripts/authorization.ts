//@ts-nocheck
import { ethers } from "hardhat";
import config from "@gamble/config";
import { abi } from "@gamble/gamebit-authorizations";

const script = async () => {
  const [signer] = await ethers.getSigners();
  const auth = await ethers.getContractAt(
    abi,
    config.Fuji.contracts.GamebitAuthorizations.address,
    signer
  );

  const isAuthed = await auth.isGameAuthorized(
    config.Fuji.contracts.LottoWinnerMock.address
  );

  const isRngAuthed = await auth.isGameRngAuthorized(
    config.Fuji.contracts.LottoWinnerMock.address
  );

  console.log(isAuthed, isRngAuthed);

  // const tx2 = await auth.addAuthorizedGame(
  //   config.Fuji.contracts.LottoWinnerMock.address,
  //   ethers.utils.parseEther("0.05")
  // );

  // console.log(tx2);
};

script()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//@ts-nocheck
import { ethers } from "hardhat";
import fetch from "isomorphic-unfetch";
import { abi as InfraAbi } from "@gamble/infra";
import { abi as LottoAbi } from "@gamble/lotto-mock-winner";
import fs from "fs-extra";

const mineEmptyBlocks = async (numberOfBlocks: number) => {
  for (let i = 0; i < numberOfBlocks; i++) {
    await ethers.provider.send("evm_mine", []);
  }
};

const CONFIG_PATH = "../../packages/config/config.json";

const deliverRng = async () => {
  const [oracle] = await ethers.getSigners();

  const config = await fs.readJson(CONFIG_PATH);
  const Infra = new ethers.Contract(
    config.Local.contracts.Infra.address,
    InfraAbi,
    oracle
  );

  const Lotto = await new ethers.Contract(
    config.Fuji.contracts.LottoWinnerMock.address,
    LottoAbi,
    oracle
  );

  const rngCall = await fetch(
    "https://qrng.anu.edu.au/API/jsonI.php?length=1&type=hex16&size=256"
  );
  const {
    data: [rng],
  } = await rngCall.json();

  console.log(rng)

  const provenance = await oracle.signMessage(JSON.stringify(rngCall.body));

  await Lotto.functions.weeklyDraw();

  await mineEmptyBlocks(1);

  await Infra.functions.fulFillRng(
    ethers.BigNumber.from(1),
    ethers.BigNumber.from(rng),
    provenance
  );

  // console.log(test);
};

deliverRng()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

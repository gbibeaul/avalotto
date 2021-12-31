import fs from "fs-extra";

/**
 * Delivers the compiled contract code to the yarn workspace of the same name
 */
async function main() {
  const contracts = await fs.readdir("./contracts/");

  await Promise.all(
    contracts.map(async (contract) => {
      const contractName = contract.replace(".sol", "");
      const packagePath = `../../packages/${contractName}/`;
      const contractPath = `./artifacts/contracts/${contract}/`;
      await fs.copySync(contractPath, packagePath);
    })
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

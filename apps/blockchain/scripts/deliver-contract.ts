import fs from "fs-extra";

/**
 * Delivers the compiled contract code to the yarn workspace of the same name
 */
async function main() {
  const contractName = process.argv[2];

  const contractExists = await fs.pathExists(`./contracts/${contractName}.sol`);
  const yarnWorkspaceExists = await fs.pathExists(`../../packages/${contractName}`);

  if (!contractExists) {
    console.log(`Contract ${contractName} does not exist`);
    process.exit(1);
  }

  if (!yarnWorkspaceExists) {
    console.log(`Yarn workspace ${contractName} does not exist`);
    process.exit(1);
  }

  const LOTTO_CONTRACT_PATH = `./artifacts/contracts/${contractName}.sol/`;
  const LOTTO_PACKAGE_PATH = `../../packages/${contractName}/`;
  await fs.copySync(LOTTO_CONTRACT_PATH, LOTTO_PACKAGE_PATH);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

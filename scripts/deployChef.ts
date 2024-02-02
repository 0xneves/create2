import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", signer.address);
  console.log("Account balance:", (await signer.getBalance()).toString());
  console.log("Getting Factory ready...");

  const factory = await ethers.getContractFactory("Seasoning", signer);
  console.log("Deploying Blockful Deployer...");

  const deployer = await factory.deploy({
    gasLimit: 2000000,
    maxFeePerGas: 200000000000,
    maxPriorityFeePerGas: 200000000000,
  });
  await deployer.deployed();
  console.log("Deployed Blockful Deployer at address %s", deployer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import { ethers } from "hardhat";

async function main() {
  const [signer] = await ethers.getSigners();
  const factory = await ethers.getContractFactory("CreateContract", signer);
  const deployer = await factory.deploy();
  await deployer.deployed();
  console.log("Deployed Blockful Deployer at address %s", deployer.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

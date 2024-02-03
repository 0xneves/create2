import { ethers } from "hardhat";
import { bytecode } from "../contractsAbi/Swaplace.json";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const [signer] = await ethers.getSigners();

  // Assert the connected network to the deployed Chef
  let chefAddress;
  if ((await ethers.provider.getNetwork()).chainId == 11155111) {
    chefAddress = process.env.SEPOLIA_DEPLOYED_ADDRESS;
  } else if ((await ethers.provider.getNetwork()).chainId == 80001) {
    chefAddress = process.env.MUMBAI_DEPLOYED_ADDRESS;
  }

  const deployer = await ethers.getContractAt(
    "Seasoning",
    chefAddress || "",
    signer,
  );

  const salt =
    "0xbb51776a39ca1068b0d300e0ac75bcbd5ecaf926ea1e8bc12b728269425def73";
  const address = await deployer.callStatic.deploy(salt, bytecode);

  const tx = await deployer.deploy(salt, bytecode);
  await tx.wait();
  console.log(
    "Deterministically deployed contract with address %s \n At tx: %s",
    address,
    tx.hash,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

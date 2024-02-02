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

  const Chef = await ethers.getContractAt(
    "Seasoning",
    chefAddress || "",
    signer,
  );

  const salt =
    "0x5e06643be5cba06442ff1546d5b82b17031235a87424389321acb2975c6ebde2";
  const computedAddress = await Chef.computeAddress(
    salt,
    ethers.utils.keccak256(bytecode),
    Chef.address,
  );
  console.log("Computed address: %s", computedAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

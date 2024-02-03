import { ethers } from "hardhat";
import { bytecode } from "../contractsAbi/Swaplace.json";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  // If you have a faster method, please get in contact.
  console.log("Looking for addresses..");

  // Assert the connected network to the deployed Chef
  let chefAddress;
  if ((await ethers.provider.getNetwork()).chainId == 11155111) {
    chefAddress = process.env.SEPOLIA_DEPLOYED_ADDRESS;
  } else if ((await ethers.provider.getNetwork()).chainId == 80001) {
    chefAddress = process.env.MUMBAI_DEPLOYED_ADDRESS;
  }

  while (true) {
    // Generate random salt
    const salt = ethers.utils.randomBytes(32);

    const address = ethers.utils.getCreate2Address(
      chefAddress || "",
      salt,
      ethers.utils.keccak256(bytecode),
    );

    // Looking for address starting with:
    const addressNo0x = address.slice(2);
    const lookingFor5 = addressNo0x.slice(0, 5);

    if (
      lookingFor5 == "1F504" ||
      lookingFor5 == "1f504" ||
      lookingFor5 == "00000" ||
      lookingFor5 == "42069"
    ) {
      const saltHex = ethers.utils.hexlify(salt);
      console.log("Address %s with Salt:", address, saltHex);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

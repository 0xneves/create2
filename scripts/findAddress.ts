import { ethers } from "hardhat";
import { bytecode } from "../contractsAbi/Swaplace.json";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  // If you have a faster method, please get in contact.
  console.log("Looking for addresses..");

  while (true) {
    // Generate random salt
    const salt = ethers.utils.randomBytes(32);

    const address = ethers.utils.getCreate2Address(
      process.env.DEPLOYER_ADDRESS || "",
      salt,
      ethers.utils.keccak256(bytecode),
    );

    // Looking for address starting with:
    const addressNo0x = address.slice(2);
    const toLowerCase = addressNo0x.toLowerCase();
    const lookingFor4 = toLowerCase.slice(0, 4);
    const lookingFor5 = toLowerCase.slice(0, 5);
    const lookingFor6 = toLowerCase.slice(0, 6);
    const lookingFor7 = toLowerCase.slice(0, 7);
    const lookingFor8 = toLowerCase.slice(0, 8);

    if (
      lookingFor4 == "DEAD" ||
      lookingFor5 == "42069" ||
      lookingFor6 == "420CBD" ||
      lookingFor6 == "777777" ||
      lookingFor6 == "999999" ||
      lookingFor6 == "111111" ||
      lookingFor6 == "000000" ||
      lookingFor6 == "c0ffee" ||
      lookingFor7 == "1111111" ||
      lookingFor7 == "7777777" ||
      lookingFor7 == "9999999" ||
      lookingFor7 == "0000000" ||
      lookingFor8 == "11111111" ||
      lookingFor8 == "99999999" ||
      lookingFor8 == "00000000" ||
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

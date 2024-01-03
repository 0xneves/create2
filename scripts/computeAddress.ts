import { ethers } from "hardhat";
import { bytecode } from "../contractsAbi/Swaplace.json";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const [signer] = await ethers.getSigners();
  const deployer = await ethers.getContractAt(
    "CreateContract",
    process.env.DEPLOYER_ADDRESS || "",
    signer,
  );

  const salt =
    "0xb93198575b01d1fb49e45178787192c087a25a239198513a9ae672e48135c562";
  const computedAddress = await deployer.computeAddress(
    salt,
    ethers.utils.keccak256(bytecode),
    deployer.address,
  );
  console.log("Computed address: %s", computedAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

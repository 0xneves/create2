import { ethers } from "hardhat";
import { bytecode } from "../contractsAbi/Swaplace.json";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const [signer] = await ethers.getSigners();
  const deployer = await ethers.getContractAt(
    "Seasoning",
    "0x97e49972DaE2AF00E9E35aA22C2c45c2eD295525",
    signer,
  );

  const salt =
    "0x5e06643be5cba06442ff1546d5b82b17031235a87424389321acb2975c6ebde2";
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

import { ethers } from "hardhat";
import { expect } from "chai";
import { bytecode } from "../contractsAbi/Swaplace.json";

describe("Create2", function () {
  let deployer: any;
  let computedAddress: any;
  const salt = ethers.utils.formatBytes32String("TestSalt");

  it("Should deploy a contract", async function () {
    const factory = await ethers.getContractFactory("Seasoning");
    deployer = await factory.deploy();
    await deployer.deployed();
    console.log("Deployed Blockful Deployer at address %s", deployer.address);
  });

  it("Should compute a contract with a deterministic address", async function () {
    const address = await deployer.computeAddress(
      salt,
      ethers.utils.keccak256(bytecode),
      deployer.address,
    );
    computedAddress = address;
    console.log(
      "Computed address using given salt resulted in: %s",
      computedAddress,
    );
  });

  it("Should use hardhat to predict contract address", async function () {
    const address = ethers.utils.getCreate2Address(
      deployer.address,
      salt,
      ethers.utils.keccak256(bytecode),
    );
    console.log("Computed address using hardhat resulted in: %s", address);
    expect(address).to.equal(computedAddress);
  });

  it("Should deploy a contract with determininstic address", async function () {
    const address = await deployer.callStatic.deploy(salt, bytecode);
    console.log(
      "Deterministically deployed Blockful Deployer with address %s",
      address,
    );
    expect(address).to.equal(computedAddress);
  });
});

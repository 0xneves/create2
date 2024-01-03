# Create2

This contract is from OpenZeppelin but was modified to be used with Blockful's interest when creating customized addresses for their contracts.

TL;DR

- Deploy this contract on a network to compute addresess or to deploy given `salts`.
- Use the `findAddress.ts` script to find the random `salts` matching desired addresses based on your choice.
- Use the `computeAddress.ts` script to compute your `salts` to check if it matches your desired address.

## Setup

You should install the dependencies using Yarn to deploy this code to a local testnet. The project uses Hardhat as a development environment. Which relies on Node.js (Recommended v18.16.0).

```
npm install --global yarn
yarn --version
```

Later on, install the dependencies using Yarn.

```
yarn install
```

## Tests

To run the tests, you should use the following command:

```
yarn test
```

## Deploy

To deploy the contract to a local testnet, you should use the following command:

```
yarn deploy
```

or if you want to deploy to a testnet, you should use the following command:

```
yarn deploy --network <network>
```

where `<network>` is the name of the network you want to deploy to.

## Find Address

To find the random addresses and matching salt, I made a simple script that have the first desired hex characters. You can run it using the following command:

```
yarn find
```

Since Typescript is very slow, we might only be able to find 6 desired characters every few hours. If you have a better solution, please let me know so I can update the script and enhance the speed.

## Computing the Salt

To compute known `salts` to check if matches your desired address. You should change the salt in the `computeAddress.ts` script, then you can use the following command:

```
yarn compute
```

## References

- [OpenZeppelin Create2](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Create2.sol)
- [Blockful](https://github.com/blockful-io)

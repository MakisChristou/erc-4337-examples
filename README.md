![](https://i.imgur.com/Ym2VV8z.png)

# Getting started

## Install dependencies and generate initial config
```bash
yarn install
yarn run init
```

## Use the following config and replace the entryPoint and the factory with your deployed contracts
```json
{
  "rpcUrl": "http://localhost:3000",
  "overideBundlerUrl": "http://localhost:4337/rpc",
  "entryPoint": "0x85FeB66007a203eDa0695Ca833A0FFDD7D879787",
  "factory": "0xBcb83afEF0826aAe3F79C44C0A324085E0d09330",
  "signingKey": "",
  "paymaster": {
    "rpcUrl": "https://api.stackup.sh/v1/paymaster/API_KEY",
    "context": {}
  }
}
```

## Get the account address

```bash
yarn run simpleAccount address
```

## Simple VET transfer

```bash
yarn run simpleAccount transfer --to 0x94C576C6Fdf76EDdCA1e88e4A0169CDcc23e5539 --amount 0.01
```

## Simple VTHO transfer

```bash
yarn run simpleAccount erc20Transfer --token 0x0000000000000000000000000000456E65726779 --to 0x94C576C6Fdf76EDdCA1e88e4A0169CDcc23e5539  --amount 0.00001
```

## Deposit an amount of VTHO to EntryPoint from SA

```bash
yarn run simpleAccount vthoDeposit  --amount 0.001 
```

## Withdraw all SA's VTHO from EntryPoint

```bash
yarn run simpleAccount vthoWithdrawAll
```
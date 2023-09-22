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

## Deploy 


```bash
yarn run simpleAccount deploy
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

## Get SA deposit info from EntryPoint

```bash
yarn run simpleAccount getDepositInfo
```

# Server

```bash
yarn run server
```

## Deploy

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"options": {"dryRun": false, "withPM": false}}' \
http://localhost:3001/deploy
```

## Simple VET transfer
```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"to": "0x94C576C6Fdf76EDdCA1e88e4A0169CDcc23e5539", "amount": "0.01", "options": {"dryRun": false, "withPM": false}}' \
http://localhost:3001/transfer
```

## Simple VTHO transfer

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"token": "0x0000000000000000000000000000456E65726779", "to": "0x94C576C6Fdf76EDdCA1e88e4A0169CDcc23e5539", "amount": "0.00001", "options": {"dryRun": false, "withPM": false}}' \
http://localhost:3001/erc20Transfer
```


## Deposit an amount of VTHO to EntryPoint from SA
```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"amount": "0.001", "options": {"dryRun": false, "withPM": false}}' \
http://localhost:3001/vthoDeposit
```

## Withdraw all SA's VTHO from EntryPoint
```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"options": {"dryRun": false, "withPM": false}}' \
http://localhost:3001/vthoWithdrawAll
```


## Get SA deposit info from EntryPoint

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"options": {"dryRun": false, "withPM": false}}' \
http://localhost:3001/getDepositInfo
```

## Get SA VET balance

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"options": {"dryRun": false, "withPM": false}}' \
http://localhost:3001/balance
```
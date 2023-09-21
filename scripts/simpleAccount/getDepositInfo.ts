import { BigNumber, ethers } from "ethers";
import { Client, Presets } from "userop";
import { CLIOpts } from "../../src";
// @ts-ignore
import config from "../../config.json";
import { BundlerJsonRpcProvider } from "userop/dist/provider";
import { EntryPoint__factory } from "userop/dist/typechain";

export default async function main(opts: CLIOpts) {
  const paymasterMiddleware = opts.withPM
    ? Presets.Middleware.verifyingPaymaster(
        config.paymaster.rpcUrl,
        config.paymaster.context
      )
    : undefined;
  const simpleAccount = await Presets.Builder.SimpleAccount.init(
    new ethers.Wallet(config.signingKey),
    config.rpcUrl,
    { paymasterMiddleware, overrideBundlerRpc: config.overideBundlerUrl, entryPoint: config.entryPoint, factory: config.factory }
  );

  let provider = new BundlerJsonRpcProvider(config.rpcUrl).setBundlerRpc(config.overideBundlerUrl);
  let entryPoint = EntryPoint__factory.connect(config.entryPoint, provider);
  let response = await entryPoint.callStatic.getDepositInfo(simpleAccount.getSender());

  // Convert the response to JSON format
    let depositInfoJson = {
        deposit: response.deposit.toString(),
        staked: response.staked,
        stake: response.stake.toString(),
        unstakeDelaySec: response.unstakeDelaySec.toString(),
        withdrawTime: response.withdrawTime.toString()
    };

console.log("JSON response: ", depositInfoJson);

return depositInfoJson;

  return response
}

import { BigNumber, ethers } from "ethers";
import { Client, Presets } from "userop";
import { CLIOpts } from "../../src";
// @ts-ignore
import config from "../../config.json";

export default async function main(t: string, amt: string, opts: CLIOpts) {
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
  const client = await Client.init(config.rpcUrl, {
    overrideBundlerRpc: config.overideBundlerUrl, entryPoint: config.entryPoint
  });

  const target = ethers.utils.getAddress(t);
  const value = ethers.utils.parseEther(amt);

  let builder = simpleAccount.execute(target, value, "0x")

  const res = await client.sendUserOperation(
    builder,
    {
      dryRun: opts.dryRun,
      onBuild: (op) => console.log("Signed UserOperation:", op),
    }
  );
  console.log(`UserOpHash: ${res.userOpHash}`);

  console.log("Waiting for transaction...");
  const ev = await res.wait();
  console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);

  return ev?.transactionHash
}

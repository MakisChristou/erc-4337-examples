import { BigNumber, ethers } from "ethers";
import { Client, Presets } from "userop";
import { CLIOpts } from "../../src";
// @ts-ignore
import config from "../../config.json";

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
  const client = await Client.init(config.rpcUrl, {
    overrideBundlerRpc: config.overideBundlerUrl, entryPoint: config.entryPoint
  });

  // Create a no-op transaction for deployment purposes
  let builder = simpleAccount.execute(simpleAccount.getSender(), 0, "0x")
  builder.setCallGasLimit(BigNumber.from(10_000_000))
  builder.setVerificationGasLimit(BigNumber.from(10_000_000))

  const op = await client.buildUserOperation(builder);
  return op.nonce;
}

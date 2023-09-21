import { ethers, BigNumber } from "ethers";
import { ERC20_ABI, SIMPLE_ACCOUNT_ABI } from "../../src";
// @ts-ignore
import config from "../../config.json";
import { Client, Presets } from "userop";
import { CLIOpts } from "../../src";

export default async function main(
  opts: CLIOpts
) {
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
    overrideBundlerRpc: config.overideBundlerUrl, entryPoint: config.entryPoint,
  });

  const address = simpleAccount.getSender();

  const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
  const token = ethers.utils.getAddress("0x0000000000000000000000000000456E65726779");
  const erc20 = new ethers.Contract(token, ERC20_ABI, provider);
  const sa = new ethers.Contract(address, SIMPLE_ACCOUNT_ABI, provider);
  const [symbol, decimals] = await Promise.all([
    erc20.symbol(),
    erc20.decimals(),
  ]);

  let builder = simpleAccount.execute(
    sa.address,
    0,
    sa.interface.encodeFunctionData("withdrawAll", [])
  )

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
}

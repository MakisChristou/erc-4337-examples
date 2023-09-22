#!/usr/bin/env node
import express from "express";
import bodyParser from "body-parser";
import deploy from "./deploy";
import getDepositInfo from "./getDepositInfo";
import transfer from "./transfer";
import erc20Transfer from "./erc20Transfer";
import vthoDeposit from "./vthoDeposit";
import vthoWithdrawAll from "./vthoWithdrawAll";
import address from "./address";
import getBalance from "./balance";

const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

const respondJsonRpc = (res: any, result: any, error: any) => {
  if (error) {
    res.status(500).json({
      jsonrpc: "2.0",
      id: 1,
      error: {
        code: -32000,
        message: error.message
      }
    });
  } else {
    res.json({
      jsonrpc: "2.0",
      id: 1,
      result: result
    });
  }
};

const createRouteHandler = (func: Function) => {
  return async (req: express.Request, res: express.Response) => {
    try {
      const result = await func(req.body);
      respondJsonRpc(res, result, null);
    } catch (error: any) {
      respondJsonRpc(res, null, error);
    }
  };
};


app.post("/address", createRouteHandler(({ options }: any) => address()));
app.post("/deploy", createRouteHandler(({ options }: any) => deploy(options)));
app.post("/getDepositInfo", createRouteHandler(({ options }: any) => getDepositInfo(options)));
app.post("/balance", createRouteHandler(({ options }: any) => getBalance(options)));
app.post("/transfer", createRouteHandler(({ to, amount, options }: any) => transfer(to, amount, options)));
app.post("/erc20Transfer", createRouteHandler(({ token, to, amount, options }: any) => erc20Transfer(token, to, amount, options)));
app.post("/vthoDeposit", createRouteHandler(({ amount, options }: any) => vthoDeposit(amount, options)));
app.post("/vthoWithdrawAll", createRouteHandler(({ options }: any) => vthoWithdrawAll(options)));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

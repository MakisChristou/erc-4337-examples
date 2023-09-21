#!/usr/bin/env node
import express from "express";
import bodyParser from "body-parser";
import deploy from "./deploy";
import transfer from "./transfer";
import erc20Transfer from "./erc20Transfer";
import vthoDeposit from "./vthoDeposit";
import vthoWithdrawAll from "./vthoWithdrawAll";

const app = express();
app.use(bodyParser.json());

app.post("/deploy", async (req, res) => {
  try {
    const result = await deploy(req.body.options);
    res.send(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.post("/transfer", async (req, res) => {
  try {
    const result = await transfer(req.body.to, req.body.amount, req.body.options);
    res.send(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.post("/erc20Transfer", async (req, res) => {
  try {
    const result = await erc20Transfer(req.body.token, req.body.to, req.body.amount, req.body.options);
    res.send(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.post("/vthoDeposit", async (req, res) => {
  try {
    const result = await vthoDeposit(req.body.amount, req.body.options);
    res.send(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.post("/vthoWithdrawAll", async (req, res) => {
  try {
    const result = await vthoWithdrawAll(req.body.options);
    res.send(result);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

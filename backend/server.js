import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { transactions } from "./data.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// GET all transactions
app.get("/api/transactions", (req, res) => {
  res.json(transactions);
});

// POST new transaction
app.post("/api/transactions", (req, res) => {
  const { date, transaction } = req.body; 
  if (!date || !transaction) {
    return res.status(400).json({ error: "date and transaction required" });
  }

  if (!transactions[date]) {
    transactions[date] = [];
  }
  transactions[date].push(transaction);
});
// DELETE a transaction
// expects JSON body: { date: "20250801", index: 0 }
app.delete("/api/transactions", (req, res) => {
  const { date, index } = req.body;

  if (!date || index === undefined) {
    return res.status(400).json({ error: "date and index required" });
  }

  if (!transactions[date] || !transactions[date][index]) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  // remove the transaction at the given index
  transactions[date].splice(index, 1);

  res.json({ success: true, transactions: transactions[date] });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

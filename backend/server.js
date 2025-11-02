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

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

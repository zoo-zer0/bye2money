import "./App.css";
import type { Transaction } from "./assets/types";
import transactionData from "./data.json"
import { useState } from "react";
import Header from "./components/Header";
import InputBar from "./components/InputBar";
import Transactions from "./components/Transactions";

export default function App() {
  
  const [date, setDate] = useState(new Date());
  const [_data, setData] = useState<Record<string, Transaction[]>>(transactionData as Record<string, Transaction[]>);
  return (
    <div className="App">
      <Header date={date} setDate={setDate} />
      <InputBar setData={setData}/>
      <Transactions date={date}/>
    </div>
  );
}

import "./App.css";
import type { Transaction } from "./assets/types";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import InputBar from "./components/InputBar";
import Transactions from "./components/Transactions";
import MonthlySum from "./components/MonthlySum";
export default function App() {
  
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState<Record<string, Transaction[]>>({});
  useEffect(()=>{
    fetch("http://localhost:3001/api/transactions")
    .then(res=>res.json())
    .then((json: Record<string, Transaction[]>)=>setData(json))
    .catch(err=>console.error(err));
  },[]);
  const addTransaction = async (dateKey:string, transaction: Transaction)=>{
    setData(prev=>({
      ...prev,
      [dateKey]: [...(prev[dateKey]||[]),transaction],
    }));
    await fetch("http://localhost:3001/api/transactions",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({date: dateKey, transaction}),
    });
  };
  return (
    <div className="App">
      <Header date={date} setDate={setDate} />
      <InputBar addTransaction={addTransaction}/>
      <MonthlySum date={date} data={data} />
      <Transactions date={date} data={data}/>
    </div>
  );
}

import "./App.css";
import type { Transaction } from "./assets/types";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import InputBar from "./components/InputBar";
import Transactions from "./components/Transactions";
import MonthlySum from "./components/MonthlySum";
export default function App() {
  const [showIncome, setShowIncome] = useState(true);
  const [showExpense, setShowExpense] = useState(true);
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
  const handleDelete = (dateKey: string, index: number)=>{
    setData(prev=>{
      const updatedDay = [...(prev[dateKey]||[])];
      updatedDay.splice(index,1);
      return{
        ...prev,
        [dateKey]: updatedDay,
      };
    });
    fetch("http://localhost:3001/api/transactions",{
      method: "DELETE",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({date:dateKey, index}),
    })
  }
  return (
    <div className="App">
      <Header date={date} setDate={setDate} />
      <InputBar addTransaction={addTransaction} transactions={data}/>
      <MonthlySum date={date} data={data} showIncome={showIncome} setShowIncome={setShowIncome} showExpense={showExpense} setShowExpense={setShowExpense}/>
      <Transactions date={date} data={data} onDelete={handleDelete} showExpense={showExpense} showIncome={showIncome}/>
    </div>
  );
}

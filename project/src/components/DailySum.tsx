import type { Transaction } from "../assets/types";
export default function DailySum({dateKey, transactions, showIncome, showExpense}:{dateKey: string, transactions:Record<string,Transaction[]>, showIncome: boolean, showExpense: boolean}){
    const dailyTransactions = transactions[dateKey] || [];
    const income = dailyTransactions
        .filter(t=>t.amount>0)
        .reduce((sum, t)=> sum+(t.amount || 0),0);
    const expense = dailyTransactions
        .filter(t=>t.amount!<0)
        .reduce((sum, t)=> sum+(t.amount||0),0);
    return(
        <div style={{display:"flex", gap:"12px"}}>
            {income !== 0 && <p style={{opacity: !showIncome?0.1 : 1}}>수입: {income.toLocaleString()}원</p>}
            {expense !== 0 && <p style={{opacity: !showExpense?0.1 : 1}}>지출: {expense.toLocaleString()}원</p>}
        </div>
    )
}
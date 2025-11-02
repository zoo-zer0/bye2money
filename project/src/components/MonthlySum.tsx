import type { Transaction } from "../assets/types";
export default function MonthlySum({date, data}:{date: Date, data: Record<string, Transaction[]>}){
    const year = date.getFullYear();
    const month = String(date.getMonth()+1).padStart(2,"0");
    const monthPrefix = `${year}${month}`;
    const monthTransactions = Object.entries(data)
        .filter(([key])=>key.startsWith(monthPrefix))
        .flatMap(([_, entries])=>entries);
    const income = monthTransactions
        .filter(t=>t.amount>0)
        .reduce((sum,t)=>sum+t.amount, 0);
    const expense = monthTransactions
        .filter(t=>t.amount<0)
        .reduce((sum, t)=> sum+t.amount, 0);
    return(
        <div style={{marginRight:"200px", display: "flex", alignItems: "center", gap: "16px", justifyContent: "flex-end" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                    style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "25%",
                    border: "none",
                    backgroundColor: "#454545ff",
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    }}
                >
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 13l4 4L19 7" />
                    </svg>
                </button>
                <p>수입: {income.toLocaleString()}원</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                    style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "25%",
                    border: "none",
                    backgroundColor: "#454545ff", 
                    color: "white",
                    fontWeight: "bold",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    }}
                >
                    <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M5 13l4 4L19 7" />
                    </svg>
                </button>
                <p>지출: {expense.toLocaleString()}원</p>
            </div>
        </div>
    )
}
import { useState } from "react";
import type { Transaction } from "../assets/types";

function InputDate({ date, setDate }: { date: Date; setDate: React.Dispatch<React.SetStateAction<Date>> }){
    
    return(<input 
        type="date"
        value={date.toISOString().split("T")[0]}
        onChange={(e)=> setDate(new Date(e.target.value))}
    />);
}
function InputAmount({ amount, setAmount}: { amount: number | null; setAmount: React.Dispatch<React.SetStateAction<number | null>> }){
    const [sign, setSign] = useState<"+" | "-">("+");
    const toggleSign = ()=>{
        setSign((prev)=>(prev ==="+"?"-":"+"));
        setAmount((prev) => (prev === null ? null : -prev));
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const value = Number(e.target.value);
        if(isNaN(value)) return;
        setAmount(sign ==="+"?value:-value);
    }

    return(
        <div style={{display:"flex", alignItems:"center", gap:"6px"}}>
            <button type="button" onClick={toggleSign} style={{
                width:"30px",
                height:"30px",
                borderRadius:"50%",
                border:"0px",
                cursor:"pointer",
                textAlign:"center",
                fontSize:"20px",
                backgroundColor: "#ffffffff",

            }}>
                {sign}
            </button>
            <input type="text" placeholder="입력하세요" value={amount === null || amount === undefined ? "" : Math.abs(amount)} onChange={handleChange}/>
        </div>
    );
}
function InputDescription({ description, setDescription }: { description: string; setDescription: React.Dispatch<React.SetStateAction<string>> }){
  return(<input type="text" placeholder="입력하세요" value={description} onChange={(e)=> setDescription(e.target.value)}/>);
}
function InputMethod({method, setMethod}:{method: string, setMethod: React.Dispatch<React.SetStateAction<string>>}){
    const methods = ["카드","현금","이체"];
    return(
        <select value={method} onChange={(e)=>setMethod(e.target.value)}>
        <option value="">선택하세요</option>
        {methods.map((m)=>(
            <option key={m} value={m}>{m}</option>
        ))}
        </select>
    );
}
function InputCategory({category, setCategory}: {category: string, setCategory: React.Dispatch<React.SetStateAction<string>>}){
  const categories = [
        "생활",
    "식비",
    "교통",
    "쇼핑/뷰티",
    "의료/건강",
    "문화/여가",
    "미분류",
    "월급",
    "용돈",
    "기타 수입",
  ];
  return(
    <select value={category} onChange={(e)=>setCategory(e.target.value)}>
      <option value="">선택하세요</option>
      {categories.map((cat)=>(
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}
export default function InputBar({ setData }: {setData:  React.Dispatch<React.SetStateAction<Record<string, Transaction[]>>>}){
    const [date, setDate] = useState(new Date());
    const [amount, setAmount] = useState<number | null>(null);
    const [description, setDescription] = useState("");
    const [method, setMethod] = useState("");
    const [category, setCategory] = useState("");
    const handleSubmit = () =>{
        if(!date||!amount || !description || !method || !category){
            alert("모든 항목을 입력하세요.");
            return;
        }
        //needed because data.json is formated as string
        const key = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
        const newTransaction = { amount, description, method, category };
        setData((prev)=>{
            const existing = prev[key] || [];
            return {
                ...prev,
                [key]: [...existing, newTransaction],
            };
        });
        setDate(new Date());
        setAmount(null);
        setDescription("");
        setMethod("");
        setCategory("");
    }
  return (
    <div className="InputBar">
      <table>
        <tr>
          <th>일자</th><th>금액</th><th>내용</th><th>결제수단</th><th>분류</th>
          <td rowSpan={2} style={{ verticalAlign: "middle", textAlign: "center" }}>
            <button onClick={handleSubmit}>Submit</button>
          </td>
        </tr>
        <tr>
          <td><InputDate date={date} setDate={setDate}/></td>
          <td><InputAmount amount={amount} setAmount={setAmount}/></td>
          <td><InputDescription description={description} setDescription={setDescription}/></td>
          <td><InputMethod method={method} setMethod={setMethod}/></td>
          <td><InputCategory category={category} setCategory={setCategory}/></td>
        </tr>
      </table>
    </div>
  )
}
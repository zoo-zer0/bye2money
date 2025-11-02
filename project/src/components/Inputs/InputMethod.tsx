import {useState, useEffect} from "react";
import type { Transaction } from "../../assets/types";



export default function InputMethod({method, setMethod, transactions}:{method: string, setMethod: React.Dispatch<React.SetStateAction<string>>, transactions: Record<string, Transaction[]>}){
    const [methods, setMethods] = useState<string[]>([]);
    const [custom, setCustom] = useState("");
    useEffect(()=>{
        const uniqueMethods = new Set<string>();
        Object.values(transactions).forEach(day=>{
            day.forEach(t=>{
                if(t.method) uniqueMethods.add(t.method);
            });
        });
        setMethods(Array.from(uniqueMethods));
    },[transactions]);
    const handleAddCustom = () =>{
        if (custom.trim()&&!methods.includes(custom)){
            setMethods(prev=>[...prev, custom]);
        }
        setMethod(custom);
        setCustom("");
    }
    return(
        <div style={{display:"flex", gap: "4px"}}>
            <select value={method} onChange={(e)=>setMethod(e.target.value)}>
                <option value="">선택하세요</option>
                {methods.map((m)=>(
                <option key={m} value={m}>{m}</option>
                ))}
            </select>
            <input type="text" placeholder="새 결제수단" value={custom} onChange={(e)=>setCustom(e.target.value)}/>
            <button type="button" onClick={handleAddCustom}>+</button>
        </div>
        
    );
}
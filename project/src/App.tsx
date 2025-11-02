import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import InputBar from "./components/InputBar";
import Transactions from "./components/Transactions";
//dropdown
//useEffect to get
//modal useContext
// context is like a global state...provider로 감싸면 modal context 모든 파일에서 사용 가능해짐. 
//calendar input type data....

//GPT told me about making props for types


export default function App() {
  
  const [date, setDate] = useState(new Date());
  const [menu, setMenu] = useState("transactions");
  return (
    <div className="App">
      <Header date={date} setDate={setDate} />
      <InputBar/>
      <Transactions date={date}/>
    </div>
  );
}

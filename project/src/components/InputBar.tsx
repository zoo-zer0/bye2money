import { useState, useEffect } from "react";

function InputDate(){
  return(<p>20xx.xx.xx</p>);
}
function InputAmount(){
  return(
    <div>
      <input type="text" value="입력하세요"/>
    </div>
  );
}
function InputDescription(){
  return(<input type="text" value="입력하세요"/>);
}
function InputMethod(){
  return(
    <select>
      <option>
        선택하세요
      </option>
    </select>
  );
}
function InputCategory(){
  const [category, setCategory] = useState("");
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
export default function InputBar(){
  return (
    <div className="InputBar">
      <table>
        <tr>
          <th>일자</th><th>금액</th><th>내용</th><th>결제수단</th><th>분류</th>
          <td rowSpan={2} style={{ verticalAlign: "middle", textAlign: "center" }}>
            <button>Submit</button>
          </td>
        </tr>
        <tr>
          <td><InputDate/></td>
          <td><InputAmount/></td>
          <td><InputDescription/></td>
          <td><InputMethod/></td>
          <td><InputCategory/></td>
        </tr>
      </table>
    </div>
  )
}
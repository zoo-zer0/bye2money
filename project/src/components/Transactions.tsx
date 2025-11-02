import data from "../data.json"
import type { Transaction } from "../assets/types";
const categoryClassMap: Record<string, string> = {
  "생활": "category-life",
  "식비": "category-food",
  "교통": "category-transport",
  "쇼핑/뷰티": "category-shopping-beauty",
  "의료/건강": "category-health",
  "문화/여가": "category-leisure",
  "미분류": "category-uncategorized",
  "월급": "category-salary",
  "용돈": "category-pocket-money",
  "기타 수입": "category-other-income",
};


//could try to divide this up next time
export default function Transactions({ date }: { date: Date }) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const monthPrefix = `${year}${month}`; // e.g. "202510"

  // Filter keys that match the given month
  const filtered = Object.entries(data)
    .filter(([key]) => key.startsWith(monthPrefix))
    .sort(([a], [b]) => Number(b) - Number(a)); // newest first (descending by numeric date)

  return (
    <div className="Transactions">
      {filtered.length === 0 ? (
        <p>이번달 내역은 없습니다.</p>
      ) : (
        filtered.map(([key, entries]) => (
          <div key={key} className="DayBlock">
            <h3>
              {key.slice(4, 6)}월 {key.slice(6, 8)}일
            </h3>
            <table>
              <tbody>
                {entries.map((t: Transaction, i: number) => (
                  <tr key={i}>
                    <th className={categoryClassMap[t.category] || "category-default"}>
                      {t.category}
                    </th>
                    <td className="description">{t.description}</td>
                    <td>{t.method}</td>
                    <td className="amount">{Number(t.amount).toLocaleString()}원</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}


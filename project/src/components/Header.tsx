interface HeaderProps {
  date: Date; //date type
  //to access date globally (?)
  setDate: React.Dispatch<React.SetStateAction<Date>>;

}

function HeaderDate({ date }: HeaderProps) {
    let year: number = date.getFullYear();
    let month: number = date.getMonth() +1;
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'long' });
    const monthText = formatter.format(date);
  return (
    <div className="Date">
      <p>{year}</p>
      <h1>{month}</h1>
      <p>{monthText}</p>
    </div>
  );
}

function HeaderDateTitle({ date, setDate }: HeaderProps) {
      const handleNextMonth = () => {
            const newDate = new Date(date);
            newDate.setMonth(date.getMonth() + 1);
            setDate(newDate);
        };

        const handlePrevMonth = () => {
            const newDate = new Date(date);
            newDate.setMonth(date.getMonth() - 1);
            setDate(newDate);
        };

  return (
    <div className = "HeaderDateTitle">
      <button style={{cursor: "pointer"}} className="prevBtn" onClick={handlePrevMonth}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <HeaderDate date={date} setDate = {setDate}/>
      <button style={{cursor: "pointer"}} className="nextBtn" onClick={handleNextMonth}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 6L15 12L9 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
function Menu(){
  return (
    <div className="Menu">
      <button style={{cursor: "pointer"}} className="transactions">
        T
      </button>
      <button style={{cursor: "pointer"}} className="graph">
        G
      </button>
      <button style={{cursor: "pointer"}} className="calendar">
        C
      </button>
    </div>
  )
}

export default function Header({date, setDate}: HeaderProps){
    return (
    <header>
      <div className="logo">
        Wise Wallet
      </div>
      <HeaderDateTitle date={date} setDate = {setDate}/>
      <Menu />
    </header>
  );
}
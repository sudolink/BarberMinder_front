import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import './App.css'
import CalendarPNG from "./assets/calendar_ico.png";
import ClockPNG from "./assets/clock_ico.png";
import NewAppointment from "./components/NewAppointment"


function App() {
  const [dateOrClock, setDateOrClock] = useState('date')
  
  function handleSelectMode(setting){
    setDateOrClock(prevSetting =>{
      return prevSetting == setting ? null : setting;
    })
  }

  return (
    <div className="App">
      <h1><span className="emphasis">B</span>arber<span className="emphasis">m</span>inder</h1>
      <div className="toolbar">
        <button onClick={() => handleSelectMode("date")} className={`dateButton modePicker ${dateOrClock == "date" && "activeMode"}`}><img className={`pickerLogos ${dateOrClock=="date" && "invertColors"}`} src={CalendarPNG} alt="Calendar logo"/></button>
        <button onClick={() => handleSelectMode("clock")} className={`clockButton modePicker ${dateOrClock == "clock" && "activeMode"}`}><img className={`pickerLogos ${dateOrClock=="clock" && "invertColors"}`} src={ClockPNG} alt="Clock logo"/></button>
      </div>
      <NewAppointment dateOrClock={dateOrClock} changeMode={handleSelectMode}/>
    </div>
  )
}

export default App
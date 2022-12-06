import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import './App.css'
import CalendarPNG from "./assets/calendar_ico.png";
import ClockPNG from "./assets/clock_ico.png";
import PersonPNG from "./assets/personpng.png";
import NewAppointment from "./components/NewAppointment"


function App() {
  const [selectedMode, setSelectedMode] = useState('date')
  const [appoint, setAppoint] = useState(false);

  return (
    <div className="App">
      <h1><span className="emphasis">B</span>arber<span className="emphasis">m</span>inder</h1>
      <div className={`toolbar`}>
        <div className="setAppointmentTime">
          <button onClick={() => setSelectedMode("date")} className={`dateButton modePicker ${selectedMode == "date" && "activeMode"}`}><img className={`pickerLogos ${selectedMode=="date" && "invertColors"}`} src={CalendarPNG} alt="Calendar logo"/></button>
          <button onClick={() => setSelectedMode("clock")} className={`clockButton modePicker ${selectedMode == "clock" && "activeMode"}`}><img className={`pickerLogos clockInvert ${selectedMode=="clock" && "invertColors"}`} src={ClockPNG} alt="Clock logo"/></button>
          <button onClick={() => setSelectedMode("customer")} className={`customerButton modePicker ${selectedMode == "customer" && "activeMode"}`}><img className={`pickerLogos ${selectedMode=="customer" && "invertColors"}`} src={PersonPNG} alt="Customer logo"/></button>
        </div>
      </div>
      <NewAppointment selectedMode={selectedMode} setSelectedMode={setSelectedMode} appoint={appoint} setAppoint={setAppoint}/>
    </div>
  )
}

export default App
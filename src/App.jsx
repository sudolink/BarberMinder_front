import { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import './App.css'
import axios from "axios";
import CalendarPNG from "./assets/calendar_ico.png";
import ClockPNG from "./assets/clock_ico.png";
import PersonPNG from "./assets/personpng.png";
import TodoListPNG from "./assets/list_icon.png";
import NewAppointment from "./components/NewAppointment"
import FutureAppointments from "./components/FutureAppointments"


function App() {
  const [selectedMode, setSelectedMode] = useState('date')
  const [newAppointment, setNewAppointment] = useState(false);
  const [appointmentStored, setAppointmentStored] = useState(false);

  function appointmentToDatabase(appointmentObj){
    axios.post('api/v1/makeAppointment',{},{params: {timestamp: appointmentObj.timestamp, customer_id: appointmentObj.customer_id}})
    .then(res => {
      console.log(res.data);
      if(res.status == 200)
      {
        setAppointmentStored(true);
      }
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    if(appointmentStored){

      setTimeout(() => {
        setAppointmentStored(false);
      }, 1900);
    }
  }, [appointmentStored])

  useEffect(() => {
    if(newAppointment != false){
      appointmentToDatabase(newAppointment);
    }
  }, [newAppointment])

  return (
    <div className="App">
      <h1><span className="emphasis">B</span>arber<span className="emphasis">m</span>inder</h1>
      <div className={`toolbar`}>
        <div className="setAppointmentTime">
          <button onClick={() => setSelectedMode("date")} className={`dateButton modePicker ${selectedMode == "date" && "activeMode"}`}><img className={`pickerLogos ${selectedMode=="date" && "invertColors"}`} src={CalendarPNG} alt="Calendar logo"/></button>
          <button onClick={() => setSelectedMode("clock")} className={`clockButton modePicker ${selectedMode == "clock" && "activeMode"}`}><img className={`pickerLogos clockInvert ${selectedMode=="clock" && "invertColors"}`} src={ClockPNG} alt="Clock logo"/></button>
          <button onClick={() => setSelectedMode("customer")} className={`customerButton modePicker ${selectedMode == "customer" && "activeMode"}`}><img className={`pickerLogos ${selectedMode=="customer" && "invertColors"}`} src={PersonPNG} alt="Customer logo"/></button>
          <button onClick={() => setSelectedMode("todos")} className={`customerButton modePicker ${selectedMode == "todos" && "activeMode"}`}><img className={`pickerLogos ${selectedMode=="todos" && "invertColors"}`} src={TodoListPNG} alt="Todo List logo"/></button>
        </div>
        {appointmentStored && <div className="appointmentStored"><h3>Appointment stored!</h3></div>}
      </div>
      <NewAppointment selectedMode={selectedMode} setSelectedMode={setSelectedMode} setAppointment={setNewAppointment}/>
      {selectedMode == "todos" && <FutureAppointments/>}
    </div>
  )
}

export default App
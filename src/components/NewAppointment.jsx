import DateSelected from "./DateSelected"
import Calendar from "react-calendar"
import Clock from "./Clock"
import {useState, useEffect} from "react";

export default function NewAppointment(props){   

    const [date, setDate] = useState(() => {
        return new Date();
    })
    const [clock, setClock] = useState(()=>{
    return {
        hours: date.getHours(),
        minutes: date.getMinutes()
    }
    })
    const [dateObj, setDateObj] = useState(()=>{
    return {
        day: 0,
        month: 0,
        year: 0
        }
    })

    const [fullDate, setFullDate] = useState(null);
    const [appoint, setAppoint] = useState(false);

    useEffect(() => {
        setFullDate(`${dateObj.day}/${dateObj.month}/${dateObj.year} @ ${clock.hours.toLocaleString(undefined, {minimumIntegerDigits: 2})}:${clock.minutes.toLocaleString(undefined, {minimumIntegerDigits: 2})}`)
    }, [dateObj, clock])
     
    useEffect(() => {
        setDateObj({
                day: date.getDate(),
                month: date.getMonth()+1,
                year: date.getFullYear()
        })
    }, [date])

    function WrapperSetDate(dt){
        setDate(dt)
        props.changeMode("clock")
        
    }

    function reportFullDate(){
        console.log(fullDate);
        setAppoint(true);
    }
    

    return (
    <div id="AppointmentSettingDiv" className="newAppointment">
        <DateSelected fullDateString={fullDate} appointing={appoint}/>
        {!appoint && <div className={`clockAndDateContainer`}>
            {props.dateOrClock == "date" && <div className="cContainer">
            <Calendar id={"calendarPick"} className={'activeComponent'} onChange={WrapperSetDate} date={date}/>
            </div>}
            {props.dateOrClock == "clock" && <div className="clock">
            <Clock id={"clockPick"} onChange={setClock} className={'activeComponent'} clock={clock} reportSelectedTime={reportFullDate}/>
            </div>}
        </div>
        }
        {appoint &&
        <div className='appointCustomer'>
            <button className="custBtns newCustomer">New customer</button>
            <button className="custBtns customerSearch">Search</button>
        </div>
        }
            
    </div>
    )
}
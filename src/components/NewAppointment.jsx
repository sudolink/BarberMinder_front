import {useState, useEffect} from "react";
import DateSelected from "./DateSelected"
import Calendar from "react-calendar"
import Clock from "./Clock"
import CustSearch from "./CustSearch";
import addCustomerPNG from "../assets/plus.png"
import findCustomerPNG from "../assets/magnifyingglass.png"

export default function NewAppointment(props){   

    const [selectedCustomerAction, setSelectedCustomerAction] = useState("find");
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
        props.setSelectedMode("clock")
    }

    function WrapperSetTimes(){
        props.setAppoint(true);
        props.setSelectedMode("customer");
    }

    return (
    <div id="AppointmentSettingDiv" className="newAppointment">
        <DateSelected fullDateString={fullDate} appointing={props.appoint}/>
        <div className={`AppointmentContainer`}>
            {props.selectedMode == "date" && <div className="cContainer">
            <Calendar id={"calendarPick"} className={'activeComponent'} onChange={WrapperSetDate} date={date}/>
            </div>}
            {props.selectedMode == "clock" && <div className="clock">
            <Clock id={"clockPick"} onChange={setClock} className={'activeComponent'} clock={clock} setTimes={WrapperSetTimes}/>
            </div>}
            {props.selectedMode == "customer" && <div className='appointCustomer'>
                <div className='toolbar2'>
                    <button onClick={() => setSelectedCustomerAction('find')} className={`custBtns findCustomer ${selectedCustomerAction == 'find' && 'activeMode'}`}><img className={'pickerLogos'} src={findCustomerPNG}/></button>
                    <button onClick={() => setSelectedCustomerAction('add')} className={`custBtns newCustomer ${selectedCustomerAction == 'add' && 'activeMode'}`}><img className={`pickerLogos`} src={addCustomerPNG}/></button>
                </div>
                {selectedCustomerAction == 'find' && <CustSearch/>}
            </div>}
        </div>
    </div>  
    )
}
import {useState, useEffect} from "react";
import DateSelected from "./DateSelected"
import Calendar from "react-calendar"
import Clock from "./Clock"
import CustSearch from "./CustSearch";
import resetCustomerPNG from "../assets/redoIcon.png"

export default function NewAppointment(props){   

    const [customer, setCustomer] = useState(null);
    const [date, setDate] = useState(() => {
        return new Date();
    })
    const [fullDate, setFullDate] = useState(null);
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

    useEffect(() => {
        setDateObj({
                day: date.getDate(),
                month: date.getMonth()+1,
                year: date.getFullYear()
        })
    }, [date])


    useEffect(() => {
        setFullDate(`${dateObj.day}/${dateObj.month}/${dateObj.year} @ ${clock.hours.toLocaleString(undefined, {minimumIntegerDigits: 2})}:${clock.minutes.toLocaleString(undefined, {minimumIntegerDigits: 2})}`)
    }, [dateObj, clock])

     
    function WrapperSetDate(dt){
        setDate(dt)
        props.setSelectedMode("clock")
    }

    function WrapperSetTimes(){
        props.setSelectedMode("customer");
    }

    function resetCustomer(){
        setCustomer(null);
    }

    function handleAppointment(e){
        e.preventDefault();
        resetCustomer();
        props.setAppointment({customer: customer, time: {...dateObj, ...clock}})
    }

    return (
    <div id="AppointmentSettingDiv" className="newAppointment">
        {props.selectedMode != "todos" &&
        <DateSelected 
            fullDateString={fullDate}
            selectedMode={props.selectedMode}
            customer={customer}
            class={props.selectedMode != customer && customer != null && "" }
        />
        }
        <div className={`AppointmentContainer`}>
            {props.selectedMode == "date" && 
                <div className="cContainer">
                    <Calendar
                        id={"calendarPick"}
                        className={'activeComponent'}
                        onChange={WrapperSetDate}
                        date={date}
                        minDetail={"year"}
                        minDate={new Date()}
                    />
                </div>
            }
            {props.selectedMode == "clock" && 
                <div className="clock">
                    <Clock id={"clockPick"}
                        onChange={setClock}
                        className={'activeComponent'}
                        date={date}
                        clock={clock} 
                        setTimes={WrapperSetTimes}
                    />
                </div>
            }
            {props.selectedMode == "customer" && 
                <div className={`appointCustomer ${customer != null && 'fullWidthAppointCustomer'}`}>
                    {customer == null &&
                        <CustSearch setCustomer={setCustomer} customer={customer}/>
                    }
                    {customer != null &&
                        <div className="appointmentConfirm">
                            <div className="appointmentDetails">
                                <h3>appointment with <span className="customerNameDetails highlight text-larger">
                                    {customer.name}
                                    </span>
                                </h3>
                                <button className="resetCustomerBtn" onClick={resetCustomer}>
                                    <img className="resetCustomerBtnImg" src={resetCustomerPNG} alt="Reset customer button"/>
                                </button>
                            </div>
                            <button className="confirmAppointmentBtn" onClick={(e) => handleAppointment(e)}>Confirm</button>
                        </div>
                    }
                </div>
            }
        </div>
    </div>  
    )
}
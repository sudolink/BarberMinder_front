import {useEffect, useState, useRef} from "react";
import Appointment from "./Appointment";

export default function DailyAppointments(props){
    const [collapsed, setCollapsed] = useState(true);
    function handleClick(e){
        setCollapsed(!collapsed);
        props.scrollTo(e.target);
    }

    const clickOverlay = <div onClick={handleClick} className="dayHeadingOverlay"></div>
    const dailyDivRef = useRef();

    useEffect(()=>{
        if(collapsed){
            //animate collapse
        }else{
            //animate expand
        }
    },[collapsed])

    useEffect(()=>{
        if(props.dayDate.getDate() == new Date().getDate()){
            console.log(`scrolling to element id: '${props.id}' (${props.dayDate.getDate()}.${props.dayDate.getMonth()+1}.${props.dayDate.getFullYear()})`)
            props.scrollTo(prevElement => {
                return prevElement != undefined ? prevElement : dailyDivRef.current; //if prevElement is undefined, set it to the current element, else keep prevElement
            })
        }
    },[])

    const dateText = () => {
        let tdt = new Date();
        let timeDiff = tdt - props.dayDate;
        let calcDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        let textString = "";
        if(calcDays === 0){
            //today
            textString = "Today";
        }
        else if(timeDiff > 0){
            //positive means the day is in the past
            if (calcDays === 1){
                textString = "Yesterday";
            }else{
                textString = `${calcDays} days ago`;
            }
        }else if(timeDiff < 0){
            //negative means the day is in the future
            if(calcDays === -1){
                textString = "Tomorrow";
            }else{
                textString = `in ${calcDays * -1} days`;
            }
        }
        return textString;
    }

    // const dailyAppointments = []
    // for(let i = 0; i < 24 * 12 * 5; i+=5){ //24 hours * 12 slots per hour (every 5 minutes)
    //     let tempDate = new Date(props.dayDate);
    //     tempDate.setHours(0,i,0,0)
    //     let tempDateTime = tempDate.getTime() / 1000;
    //     let tempApptObj = {
    //         time: tempDateTime,
    //         customer: null
    //     }
    //     let foundAppointment = props.appointments.find(appointment => appointment.time === tempDateTime);
    //     let tempAppt = foundAppointment ? <Appointment appointment={foundAppointment} key={i} id={`day_${props.dayDate.getDate()}_hour_${tempDate.getHours()}_mins_${tempDate.getMinutes()}`}/> : <Appointment appointment={tempApptObj} key={i} id={`day_${props.dayDate.getDate()}_hour_${tempDate.getHours()}_mins_${tempDate.getMinutes()}`}/>
    //     dailyAppointments.push(tempAppt);
    // }

    //next thing to do, instead of rendering each unscheduled 5-minute step in the day,
    //is to render blocks of unscheduled appointments as a single appointment showing the time-range of the block, and saying "unscheduled" or something
    //...making the list much shorter, easier to read


    return(
        <div ref={dailyDivRef} className="dailyAppointments" id={props.id}>
            <div className={`dayHeadingContainer ${!collapsed && props.appointments.length > 0 && "dayHeadingHighlighted"}`}>
                <h4 className="dayHeading dhdate">{`${props.dayDate.getDate()}.${props.dayDate.getMonth()+1}.${props.dayDate.getFullYear().toString().slice(2)}`}</h4>
                <h5 className="dhText">{dateText()}</h5>
                <h5 className="dhday">({props.day})</h5>
                <h4 className="numberOfAppointments">{`${props.appointments?.length < 1 ? "0" : props.appointments.length }`}</h4><h4 className="numberOfAppointmentsX">x</h4>
                {clickOverlay}
            </div>
            {!collapsed && props.appointments.length > 0 && <div className="dailyAppointmentsList">
                {props.appointments.map((appointment, index) => {
                    return <Appointment appointment={appointment} key={index} apptFuncs={props.apptFuncs}/>
                })}
            </div>}
            {/* {!collapsed && props.appointments.length > 0 && <div className="dailyAppointmentsList">
                {dailyAppointments}
            </div>} */}
        </div>
    )
}
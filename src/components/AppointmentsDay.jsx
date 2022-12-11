import { useEffect } from "react";
import {useState} from "react";
import Appointment from "./Appointment";

export default function DailyAppointments(props){
    const [collapsed, setCollapsed] = useState(true);
    // console.log(props)
    function handleClick(e){
        setCollapsed(!collapsed);
        e.target.scrollIntoView();
    }

    const clickOverlay = <div onClick={handleClick} className="dayHeadingOverlay"></div>

    useEffect(()=>{
        if(collapsed){
        }
    },[collapsed])

    return(
        <div className="dailyAppointments" id={props.id}>
            <div className={`dayHeadingContainer ${!collapsed && props.appointments.length > 0 && "dayHeadingHighlighted"}`}>
                <h4 className="dayHeading dhdate">{`${props.dayDate.getDate()}.${props.dayDate.getMonth()+1}.${props.dayDate.getFullYear().toString().slice(2)}`}</h4>
                <h5 className="dhday">({props.day})</h5>
                <h4 className="numberOfAppointments">{`${props.appointments?.length < 1 ? "0" : props.appointments.length }`}</h4><h4 className="numberOfAppointmentsX">x</h4>
                {clickOverlay}
            </div>
            {!collapsed && props.appointments.length > 0 && <div className="dailyAppointmentsList">
                {props.appointments.map((appointment, index) => {
                    return <Appointment appointment={appointment} key={index} />
                })}
            </div>}
        </div>
    )
}
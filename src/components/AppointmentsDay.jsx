import {useState} from "react";
import Appointment from "./Appointment";

export default function DailyAppointments(props){
    console.log(props)
    return(
        <div className="dailyAppointments">
            <div className="dayHeadingContainer">
                <h3 className="dayHeading">{props.day}</h3>
                <h4 className="noAppointments">{`${props.appointments?.length < 1 ? "0" : props.appointments.length }`} appointments</h4>
            </div>
            <div className="dailyAppointmentsList">
                {props.appointments.map((appointment, index) => {
                    return <Appointment appointment={appointment} key={index} />
                })}
            </div>
        </div>
    )
}
import {useState, useEffect} from "react";
import DailyAppointments from "./AppointmentsDay";

export default function WeeklyAppointments(props){
    const fullWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    return (
        <div className="weeklyAppointments">
            {fullWeek.map((day, index) => {
                return <DailyAppointments appointments={props.appointments.filter(appointment => new Date(appointment.time * 1000).getDay() === index)} day={day} key={index} />
            })}
        </div>
    )
}
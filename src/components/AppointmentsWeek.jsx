import {useState, useEffect} from "react";
import DailyAppointments from "./AppointmentsDay";

export default function WeeklyAppointments(props){
    const fullWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayDate = new Date(props.weekStart);
    const weeklyHeadline = `${props.weekStart.getDate()}.${props.weekStart.getMonth()+1}.${props.weekStart.getFullYear().toString().slice(2)} - ${props.weekEnd.getDate()}.${props.weekEnd.getMonth()+1}.${props.weekEnd.getFullYear().toString().slice(2)}`;
    return (
        <div className="weeklyAppointments" id={`week_${props.weekNum}`}>
            <h3 className="weekHeading">{weeklyHeadline}</h3>
            {fullWeek.map((day, index) => {
                let tempDate = new Date(dayDate);
                tempDate.setDate(tempDate.getDate() + index);
                return <DailyAppointments appointments={props.appointments.filter(appointment => new Date(appointment.time * 1000).getDay() === index)} dayDate={tempDate} day={day} key={index} id={`week_${props.weekNum}_day_${index}`}/>
            })}
        </div>
    )
}
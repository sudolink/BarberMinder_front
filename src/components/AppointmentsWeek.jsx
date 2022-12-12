import {useState, useEffect} from "react";
import DailyAppointments from "./AppointmentsDay";

export default function WeeklyAppointments(props){
    const fullWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayDate = new Date(props.weekStart);
    let weeklyHeadline = "";
    if(props.weekStart.getFullYear() === new Date().getFullYear()){
        //same year
        weeklyHeadline = `${props.weekStart.getDate()}.${props.weekStart.getMonth()+1} - ${props.weekEnd.getDate()}.${props.weekEnd.getMonth()+1} (${props.weekEnd.getFullYear()})`;
    }else{
        weeklyHeadline = `${props.weekStart.getDate()}.${props.weekStart.getMonth()+1}.${props.weekStart.getFullYear()} - ${props.weekEnd.getDate()}.${props.weekEnd.getMonth()+1}.${props.weekEnd.getFullYear()}`;`${props.weekStart.getDate()}.${props.weekStart.getMonth()+1}.${props.weekStart.getFullYear().toString().slice(2)} - ${props.weekEnd.getDate()}.${props.weekEnd.getMonth()+1}.${props.weekEnd.getFullYear().toString().slice(2)}`;
    }
    return (
        <div className="weeklyAppointments" id={`week_${props.weekNum}`}>
            <h3 className="weekHeading">{weeklyHeadline}</h3>
            {fullWeek.map((day, index) => {
                let tempDate = new Date(dayDate);
                tempDate.setDate(tempDate.getDate() + index);
                let tempComp = <DailyAppointments appointments={props.appointments.filter(appointment => new Date(appointment.time * 1000).getDay() === index)} dayDate={tempDate} scrollTo={props.scrollTo} day={day} key={index} id={`week_${props.weekNum}_day_${index}`}/>
                return tempComp
           })}
        </div>
    )
}
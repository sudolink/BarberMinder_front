import axios from "axios";
import { useState, useEffect } from "react";
import WeeklyAppointments from "./AppointmentsWeek";

export default function FutureAppointments(props){
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [todayDate, setTodayDate] = useState(new Date());

    useEffect(() => {
        setIsLoading(true);
        axios.get("/api/v1/getAppointments", {params: {timestamp: Math.floor(todayDate.getTime()/1000)}}) // Math.round to get rid of the milliseconds trailing the . after division
        .then(res => {
            setAppointments(res.data);
            setIsLoading(false);
        })
        .catch(err => console.log(err))
    }, [])

    if(isLoading){
        return <div>Loading...</div>
    }

    function findWeekStartAndEnd(){
        let today = todayDate.getDay();
        let start = new Date(todayDate);
        let end = new Date(todayDate);
        start.setDate(start.getDate() - today);
        end.setDate(end.getDate() + (6 - today));
        console.log(start, end)
        return [start, end];
    }

    const [weekStart, weekEnd] = findWeekStartAndEnd();

    return (
        <div className="futureAppointments">
            <h2 className="appointmentsHeading">Appointments:</h2>
            <div className="appointments">
                <WeeklyAppointments appointments={appointments} todayDate={todayDate} weekStart ={weekStart} weekEnd={weekEnd} />
            </div>
        </div>
    )
}
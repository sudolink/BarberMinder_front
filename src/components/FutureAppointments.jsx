import axios from "axios";
import { useState, useEffect } from "react";
import WeeklyAppointments from "./AppointmentsWeek";

export default function FutureAppointments(props){
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [todayDate, setTodayDate] = useState(new Date());
    const [scrollTo, setScrollTo] = useState(undefined);
    const [update, setUpdate] = useState(() => {return props.update});

    useEffect(() => {
        setIsLoading(true);
        axios.get("/api/v1/getAppointments", {params: {timestamp: Math.floor(todayDate.getTime()/1000)}}) // Math.round to get rid of the milliseconds trailing the . after division
        .then(res => {
            setAppointments(res.data);
            setIsLoading(false);
        })
        .catch(err => console.log(err))
    }, [update])

    useEffect(() => {
        if(scrollTo != undefined){
            scrollTo.scrollIntoView({behavior: "smooth"});
        }
    }, [scrollTo]);

    function scrollToWrapper(element){
        setScrollTo(element);
    }

    function findWeekStartAndEnd(){
        let today = todayDate.getDay();
        let start = new Date(todayDate);
        let end = new Date(todayDate);
        start.setDate(start.getDate() - today);
        end.setDate(end.getDate() + (6 - today));
        // console.log(start, end)
        return [start, end];
    }

    const [weekStart, weekEnd] = findWeekStartAndEnd();
    //generates the numbers for the weeks and their date ranges
    //if 5 weeks are generated, then the first week will be the week 2 weeks prior to the current one, and the 3rd week will be the current week.
    //it should load the next 2 weeks scrolling down - not implemented yet
    function generateWeeks(){
        let weeks = [];
        let week = new Date(weekStart); //current week start, subtract 14 days to get the first week
        week.setDate(week.getDate() - 14);
        for(let i = 0; i < 5; i++){
            let tempWeek = new Date(week);
            weeks.push(tempWeek);
            tempWeek.setDate(tempWeek.getDate() + 7*i);
        }
        return weeks;
    }

    if(isLoading){
        return <div>Loading...</div>
    }
    return (
        <div className="futureAppointments">
            <h2 className="appointmentsHeading">Appointments:</h2>
            <div className="appointments">
                {generateWeeks().map((week, index) => {
                    let tempWeekEnd = new Date(week)
                    tempWeekEnd.setDate(week.getDate()+6);
                    return <WeeklyAppointments 
                        appointments={appointments.filter(appt => {
                            let apptDate = new Date(appt.time * 1000);
                            return apptDate >= week && apptDate <= tempWeekEnd
                        })} 
                        todayDate={todayDate} 
                        weekStart={week}
                        weekEnd={tempWeekEnd}
                        scrollTo={scrollToWrapper}
                        weekNum={index}
                        apptFuncs = {props.apptFuncs}
                        key={index}/>
                })}
            </div>
        </div>
    )
}
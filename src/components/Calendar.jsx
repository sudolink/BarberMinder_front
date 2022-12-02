import {useState, useEffect} from "react";
import Year from "./Year";
export default function Calendar(){
    const [date, setDate] = useState(()=>{
        return new Date();
    })

    return (
        <div className="calendarContainer">
            <p>{`Today: ${date}`}</p>
            <Year date={date} />
        </div>
    )
}
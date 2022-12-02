import {useState} from "react";

export default function Selection(props){
    return (
        <div className="dateSelection">
            <p className="highlight">
                Date selected: {`${props.dateObj.day}/${props.dateObj.month}/${props.dateObj.year}`}
                {` @ ${props.clock.hours.toLocaleString(undefined, {minimumIntegerDigits: 2})}:${props.clock.minutes.toLocaleString(undefined, {minimumIntegerDigits: 2})}`}
            
            </p>
        </div>
    )
}
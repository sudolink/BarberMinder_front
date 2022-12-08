
import {useState, useRef, useEffect} from "react";

export default function Clock(props){
    const [showTime, setShowTime] = useState(false);
    const [isToday, setIsToday] = useState(() => {
        const today = new Date();
        const date = props.date;
        return (today.getDate() == date.getDate() && today.getMonth() == date.getMonth() && today.getFullYear() == date.getFullYear());
    });
    
    const intervalRef = useRef();
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setShowTime((prev) => !prev);
        }, 3000)
        return () => {
            clearInterval(intervalRef.current);
        }
    },[]);

    function handleHourClick(e,hours){
        props.onChange(prevClock => {
            return {
                ...prevClock,
                hours: hours
            }
        })
    }

    function handleMinuteClick(e,mins){
        props.onChange(prevClock => {
            return {
                ...prevClock,
                minutes: mins
            }
        })
    }
    
    //generates 24 divs for the hour picker, assigns classnames to them in 15 degree steps
    const hrs = [];
    const currentHour = props.date.getHours();
    let hour_degree_steps = 15
    for(let i = 0; i<=23;i++){ //hours 0-23
        const greyedOut = isToday && i < currentHour;
        hrs.push(
            <div onClick={e => handleHourClick(e,i)} key={`hour_${i}`} className={`deg-${hour_degree_steps*i} hourDiv`}>
                <div className={`innerCirc ${i == props.clock.hours && "selectedBubble"} ${greyedOut && "disabledHourBubble" }`}>
                    <p className={`hourText ${greyedOut && "disabledText"}`}>{i}</p>
                </div>
            </div>
        )
    }

    //generates 12 divs for the minute picker 
    const mins = [];
    let min_degree_steps = 30;
    let minute_step = 5;
    const roundedMinutes = Math.round((props.clock.minutes/5))*5
    for(let i = 0; i<=11; i++){ // minute picker is in 5 minute intervals... 60 / 5 = 12
        const greyedOut = currentHour == props.clock.hours && i * minute_step < props.date.getMinutes();
        mins.push(
            <div onClick={e => handleMinuteClick(e,i*minute_step)} key={`min_${minute_step*i}`} id={`min_${i*minute_step}`} className={`deg-${i*min_degree_steps}-mins minDiv`}> 
                <div 
                    className={`innerCircMinutes ${i*minute_step == roundedMinutes && "selectedBubble"} ${greyedOut && 'disabledMinuteBubble'}`}>
                    <p className={`minText ${ greyedOut && "disabledText"}`}>{`${i*minute_step}`.toLocaleString(undefined, {minimumIntegerDigits: 2})}</p> 
                </div>
            </div>
        )
    }
    const roundedTo5Minutes = Math.round((props.clock.minutes/5))*5
    return(
        <div className="clock">
            <div className="bigRing">
                {hrs}
                <div className="smallRing">
                    <div className="timeBox">
                        <p className={`${!showTime && 'confirmClockText'} timeSet`} onClick={props.setTimes}>
                            { !showTime ? `confirm` : `${props.clock.hours.toLocaleString(undefined,{minimumIntegerDigits: 2})}:${roundedTo5Minutes.toLocaleString(undefined, {minimumIntegerDigits: 2})}`}
                        </p>
                    </div>
                </div>
                {mins}
            </div>
        </div>
    )
}

import {useState} from "react";export default function Clock(props){

    //const[hoveredOver, setHoveredOver] = useState(null);
    //console.log(hoveredOver)
    //console.log(`${props.clock.minutes} -> ${Math.round((props.clock.minutes/5))*5}`)
    
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
    let hour_degree_steps = 15
    for(let i = 0; i<=23;i++){ //hours 0-23
        //onMouseEnter={e => setHoveredOver(e.target)} onMouseLeave={e => setHoveredOver(null)}
        hrs.push(
            <div onClick={e => handleHourClick(e,i)} key={`hour_${i}`} className={`deg-${hour_degree_steps*i} hourDiv`}>
                <div className={`innerCirc ${i == props.clock.hours && "selectedBubble"}`}>
                    <p className="hourText">{i}</p>
                </div>
            </div>
        )
    }

    //generates 12 divs for the minute picker 
    const mins = [];
    let min_degree_steps = 30;
    let minute_step = 5;
    for(let i = 0; i<=11; i++){ // minute picker is in 5 minute intervals... 60 / 5 = 12
        mins.push(
            <div onClick={e => handleMinuteClick(e,i*minute_step)} key={`min_${minute_step*i}`} id={`min_${i*minute_step}`} className={`deg-${i*min_degree_steps}-mins minDiv`}> 
                <div className={`innerCircMinutes ${i*minute_step == Math.round((props.clock.minutes/5))*5 && "selectedBubble"}`}>
                    <p className="minText">{`${i*minute_step}`.toLocaleString(undefined, {minimumIntegerDigits: 2})}</p> 
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
                        <p className="timeSet">
                            {`${props.clock.hours.toLocaleString(undefined,{minimumIntegerDigits: 2})}:${roundedTo5Minutes.toLocaleString(undefined, {minimumIntegerDigits: 2})}`}
                        </p>
                    </div>
                </div>
                {mins}
            </div>
        </div>
    )
}
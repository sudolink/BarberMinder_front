import DateSelected from "./DateSelected"
import Calendar from "react-calendar"
import Clock from "./Clock"

export default function NewAppointment(props){
    return (
    <div className="newAppointment">
        <DateSelected dateObj={props.dateObj} clock={props.clock} />
        <div className="clockAndDateContainer">
            {props.dateOrClock == "date" && <div className="cContainer">
            <Calendar onChange={props.setDate} date={props.date} />
            </div>}
            {props.dateOrClock == "clock" &&
            <div className="clock">
            <Clock onChange={props.setClock} clock={props.clock} />
            </div>}
        </div>
    </div>
    )
}
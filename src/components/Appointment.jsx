import { useState } from 'react';

export default function Appointment(props){
    const [appointment, setAppointment] = useState(props.appointment);
    //example of an incoming appointment object:
    // {
    //     "time": 1671058500,
    //     "customer": {
    //         "id": 3,
    //         "name": "Charlie",
    //         "phone": "333-333-3333"
    //     }
    // }

    const date = new Date(appointment.time * 1000);
    const dateObj = {
        day: date.getDate(),
        month: date.getMonth()+1,
        year: date.getFullYear(),
        hour: date.getHours(),
        minutes: date.getMinutes()
    }
    const dateString = `${dateObj.day}/${dateObj.month}/${dateObj.year.toString().slice(2)} ${dateObj.hour.toLocaleString(undefined, {minimumIntegerDigits: 2})}:${dateObj.minutes.toLocaleString(undefined, {minimumIntegerDigits: 2})}`

    return (
        <div className="appointment">
            <div className="appointmentInfo">
                <div className="appointmentCustomer">
                    <h4>{appointment.customer.name}</h4>
                </div>
                <div className="appointmentDate">
                    <h5>{`${dateString}`}</h5>
                </div>
            </div>
            <div className="appointmentButtons">
                <button className="apptBtns" onClick={() => props.setAppointment(appointment)}>Edit</button>
                <button className="apptBtns" onClick={() => props.deleteAppointment(appointment.id)}>Delete</button>
            </div>
        </div>
    )
}
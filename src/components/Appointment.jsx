import { useState } from 'react';
//example of an incoming appointment object:
// {
//     "time": 1671058500,
//     "id": 1,
//     "customer": {
//         "id": 3,
//         "name": "Charlie",
//         "phone": "333-333-3333"
//     }
// }
        
export default function Appointment(props){
    const [appointment, setAppointment] = useState(props.appointment);
    const [editing, setEditing] = useState(false);
    const [deletePrompt, setDeletePrompt] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const [deleteConfirmed, setDeleteConfirmed] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const date = new Date(appointment.time * 1000);
    const dateObj = {
        day: date.getDate(),    
        month: date.getMonth()+1,
        year: date.getFullYear(),
        hour: date.getHours(),
        minutes: date.getMinutes()
    }
    const dateString = `${dateObj.day}/${dateObj.month}/${dateObj.year.toString().slice(2)}`
    const hourString = `${dateObj.hour.toLocaleString(undefined, {minimumIntegerDigits: 2})}:${dateObj.minutes.toLocaleString(undefined, {minimumIntegerDigits: 2})}` 
    
    function editAppt(id){
        setEditing(true);
        props.apptFuncs[1](id);//passing in id temorarily, will pass in new appointment object later
    }

    function delAppt(id){
        setDeletePrompt(true);
        props.apptFuncs[0](id);
    }
    
    function handleDateChange(e){
        console.log(e);
    }
    
    function handleTimeChange(e){
        console.log(e);
    }
    
    function handleSubmit(e){
        e.preventDefault();
        setEditing(false);
        console.log("confirm edit");
        //props.apptFuncs[1](appointment.id);
    }

    function handleDeleteConfirm(e){
        e.preventDefault();
        setDeleteConfirmed(true);
        props.apptFuncs[0](appointment.id,setDeleteSuccess);
    }

    function handleDeleteCancel(e){
        e.preventDefault();
        setDeletePrompt(false);
        console.log("cancel delete");
    }

    useEffect(() => {
        if(deleteSuccess){
            setDeletePrompt(false);
            setDeleteConfirmed(false);
        }
    }, [deleteSuccess]);


    return (
        <div className={`appointment ${editing && "flex-col-wrap"}`}>
            <div className="appointmentInfo">
                <div className="appointmentDate">
                    <h5>{`${hourString}`}</h5>
                </div>
                {appointment.customer != null && <div className="appointmentCustomer">
                    <h4>{appointment.customer.name}</h4>
                </div>}
                {deletePrompt && <div className="appointmentDeleteNotice">
                    {
                    !deleteConfirmed ?
                    <h5 className="noticeHeading">Delete this appointment?</h5>
                    : <div className="noticeHeadingDeleting"><h5>Deleting...</h5></div>
                    }
                    {!deleteConfirmed && <div className="deleteBtns">
                        <button onClick={handleDeleteConfirm} className="deleteConfirm" type="submit">delete</button>
                        <button onClick={handleDeleteCancel} className="deleteConfirm" type="submit">cancel</button>
                    </div>}
                </div>
                }
            </div>
            {editing && <div className="editDropdown">
                <form onSubmit={handleSubmit} className="editForm">
                    <div className="formFields">
                        <input className="editFields" name="date" id="date" value={dateString} onChange={handleDateChange}/>
                        <input className="editFields" name="time" id="time" value={hourString} onChange={handleTimeChange}/>
                    </div>
                    <button className="editConfirm" type="submit">confirm</button>
                </form>
            </div>}
            {appointment.customer != null && !editing && <div className="appointmentButtons">
                <button className="apptBtns" onClick={() => editAppt(appointment.id)}>Edit</button>
                <button className="apptBtns" onClick={() => delAppt(appointment.id)}>Delete</button>
            </div>}
        </div>
    )
}
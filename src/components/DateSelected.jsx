import {useState, useEffect} from "react";

export default function Selection(props){
    const [className, setClassName] = useState(props.class || "");
    const [appointmentTime, setAppointmentTime] = useState({
        date: null,
        time: null
    });

    function slideDown(){
        setClassName("text-slideDown");
        const waitOneSec = setInterval(() => {
            setClassName("text-slidDown");
            clearInterval(waitOneSec);
        }, 980)
    }
    
    function slideUp(){
        setClassName("text-slideUp");
        const waitOneSec = setInterval(() => {
            setClassName("text-slidUp");
            clearInterval(waitOneSec);
        }, 980)
    }

    useEffect(() => {
        //try to split the date string with the @ symbol
        //if it doesn't work, then don't do anything
        //if it does, then set the appointmentTime state
        try{
            const splitDate = props.fullDateString.split("@");
            setAppointmentTime({
                date: splitDate[0],
                time: splitDate[1]
            })
        }catch(err){}
    }, [props.fullDateString]);

    useEffect(() => {
        if(props.customer != null){
            slideDown();
        }else{
            setClassName("");
        }
    }, [props.customer]);

    useEffect(() => {
        if(props.selectedMode != "customer"){
            setClassName("");
        } else if (props.selectedMode == "customer" && props.customer != null){
            slideDown();
        }
    },[props.selectedMode])

    return (
        <div className="dateSelection">
            <div className={`highlight selectedDate ${props.selectedMode == "customer" && className}`}>
                <p>{appointmentTime.date}</p>
                <span className="dateSelectedSpan">at</span>
                <p>{appointmentTime.time}</p>
            </div>
        </div>
    )
}
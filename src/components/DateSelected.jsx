import {useState, useEffect} from "react";

export default function Selection(props){
    const [className, setClassName] = useState("");
    console.log(className);

    useEffect(() => {
        if(props.customer != null){
            setClassName("text-slideDown");
            const waitOneSec = setInterval(() => {
                setClassName("text-slidDown");
                console.log("came to slide down")
                clearInterval(waitOneSec);
            }, 950)
        }else{
            setClassName("");
        }
    }, [props.customer]);

    useEffect(() => {
        if(props.selectedMode != "customer"){
            setClassName("");
        } else if (props.selectedMode == "customer" && props.customer != null){
            setClassName("text-slideDown");
            const waitOneSec = setInterval(() => {
                setClassName("text-slidDown");
                console.log("came to slide down")
                clearInterval(waitOneSec);
            }, 1000)
        }
    },[props.selectedMode])

    return (
        <div className="dateSelection">
            <p className={`highlight selectedDate ${props.selectedMode == "customer" && "text-enlarged"} ${props.selectedMode == "customer" && className}`}>
                {`${props.fullDateString}`}
            </p>
        </div>
    )
}
export default function Day(props){
    //expects to know what day of the month it will be
    return (
        <div className="dayBox">
            <p>day:{props?.day}</p>
        </div>
    )
}
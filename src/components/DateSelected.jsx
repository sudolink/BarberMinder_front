import {useState} from "react";

export default function Selection(props){
    return (
        <div className="dateSelection">
            <p className={`highlight ${props.appointing && "text-enlarge text-enlarged"}`}>
                {!props.appointing ? `Date selected: ${props.fullDateString}` : `${props.fullDateString}`}
            </p>
        </div>
    )
}
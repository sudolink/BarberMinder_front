import {useState} from "react";

export default function Selection(props){
    return (
        <div className="dateSelection">
            <p className={`highlight text-enlarged`}>
                {`${props.fullDateString}`}
            </p>
        </div>
    )
}
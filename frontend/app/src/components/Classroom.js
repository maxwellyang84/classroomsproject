import React from "react";
import './Classroom.css';

function Classroom({name, ...props}){
    return(
        <h2 className="classroom" {...props}>{name}</h2>
    )
}

export default Classroom;
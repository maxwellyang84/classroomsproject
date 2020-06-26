import React from "react";
import './Classroom.css';

function Classroom({name, ...props}){
    return(
        <>
        <div className="classroom-container" {...props}>
            <div>
                <h2 className="classroom-header">Classroom:</h2>
                <h2 className="classroom">{name}</h2>
            </div>
            <div className="line"/>
            <div>
                <h2 className="availability-header">Availability:</h2>
                <h2 className="availability">8 Hours</h2>
            </div>
        </div>
        
        </>
       
    )
}

export default Classroom;
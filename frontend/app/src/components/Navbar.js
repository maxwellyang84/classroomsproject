import React from "react";
import './Navbar.css';

function Navbar(props){
    return(
        <>
            <h1 className="header">UBC Classroom Study</h1>
            <h3 className="navigation">Contact</h3>
            <h3 className="navigation">About</h3>
            <h3 className="navigation">Home</h3>
        </>
    )
}

export default Navbar
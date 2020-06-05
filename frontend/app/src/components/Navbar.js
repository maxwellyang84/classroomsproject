import React from "react";
import './Navbar.css';

function Navbar(props){
    return(
        <h1 className="topbar">{props.name}</h1>
    )
}

export default Navbar
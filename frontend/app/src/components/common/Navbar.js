import React from "react";
import './Navbar.css';
import {Link} from 'react-router-dom';

function Navbar(props){
    return(
        <>
           <Link to="/"> <h1 className="header">UBC Classroom Study</h1></Link>
            <Link to="/contact"><h3 className="navigation">Contact</h3></Link>
            <Link to="/about"><h3 className="navigation">About</h3></Link>
            <Link to="/"><h3 className="navigation">Home</h3>     </Link>  
            
        </>
    )
}

export default Navbar
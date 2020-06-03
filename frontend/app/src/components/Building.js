import React, {useState} from "react";
import './Building.css';
function Building(props){
    const [selected, setSelected] = useState(true);
    return (
        <h2 className="building">{props.name}</h2>
    )
}

export default Building;
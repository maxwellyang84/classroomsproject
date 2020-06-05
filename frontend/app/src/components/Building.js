import React, {useState} from "react";
import './Building.css';
function Building({name, ...props}){
    const [selected, setSelected] = useState(true);
    return (
        <h2 className={selected ? "building building-selected": "building building-unselected"} onClick={()=> setSelected(selected? false: true)} {...props}>{name}</h2>
    )
}

export default Building;
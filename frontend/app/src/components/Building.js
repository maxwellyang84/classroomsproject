import React, {useState} from "react";
import './Building.css';
function Building({name, ...props}){
    const [selected, setSelected] = useState(true);
    const [hovered, setHovered] = useState(false);
    const toggleHover = ()=>setHovered(!hovered);
    let buildingClassName = selected?  "building building-selected": "building building-unselected";
    buildingClassName += hovered? " shadow hover": " shadow-sm";
    console.log(buildingClassName);

    return (
        <h2 className={buildingClassName} onClick={()=> {
            setSelected(selected? false: true)
           
        }} {...props} onMouseEnter={toggleHover} onMouseLeave={toggleHover}>{name}</h2>
    )
}

export default Building;
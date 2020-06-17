import React, {useState} from "react";
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import Classroom from './Classroom';
import Spinner from 'react-bootstrap/Spinner';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import './ClassroomList.css'

const CLASSROOMS = gql`
{
    getClassrooms{
        Name
    }
}
`;
function ClassroomPopover(name, props){
    return (
        <Popover className={"popover-positioned-right"} {...props}>
            <Popover.Title as="h3">ClassName</Popover.Title>
            <Popover.Content>
                {name}
            </Popover.Content>
        </Popover>
    )
}

function ClassroomList(props){
    // const {loading, error, data} = useQuery(CLASSROOMS);
    const [currentPopover, setCurrentPopover] = useState([])
    if(props.loading) return (
        <div className="center">
             <Spinner animation="border" />
        </div>
    )
 

    // if(error) return <p> ERROR :(</p>
    const classroomList = props.data.ClassroomPagination.map(({Name})=>Name);
    return classroomList.map((Name)=>
    <OverlayTrigger
        show={currentPopover === Name}
        trigger="click"
        key={Name}
        placement="right"
        overlay={(props) =>
            ClassroomPopover(Name, props)
        }
        rootClose
    >
        <Classroom name={Name} onClick={()=>{
            setCurrentPopover(Name)}}
            />
    </OverlayTrigger>
        

    )
}

export default ClassroomList;
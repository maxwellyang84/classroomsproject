import React from "react";
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import Classroom from './Classroom';
import Spinner from 'react-bootstrap/Spinner';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

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

function ClassroomList(){
    const {loading, error, data} = useQuery(CLASSROOMS);
    if(loading) return <Spinner animation="border"/>
    if(error) return <p> ERROR :(</p>
    return data.getClassrooms.map(({Name})=>
    <OverlayTrigger
        trigger="click"
        key={Name}
        placement="right"
        overlay={(props) =>
            ClassroomPopover(Name, props)
        }
    >
        <Classroom name={Name}/>
    </OverlayTrigger>
        

    )
}

export default ClassroomList;
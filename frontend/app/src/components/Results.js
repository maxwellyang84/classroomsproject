import React from "react";
import Pages from './Pages';
import ClassroomList from './ClassroomList';

function Results(){
    return(
        <>
            <h3>Classroom List</h3>
            <ClassroomList/>
            <Pages/>
        </>
    )
}

export default Results;
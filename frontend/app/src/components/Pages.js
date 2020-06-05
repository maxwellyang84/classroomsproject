import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

function Pages(){
    let active = 1;
    let items = []
    for(let number = 1; number <= 5; number++){
        items.push(
            <Pagination.Item key={number} active={number==active}>
                {number}
            </Pagination.Item>
        );
    }
    return (
        <Pagination onClick={(e)=> handleClick(e)}>{items}</Pagination>
    )
}

function handleClick(event){
    console.log(event);
}

export default Pages;
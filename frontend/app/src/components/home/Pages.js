import React from 'react';
import Pagination from 'react-bootstrap/Pagination';


const classroomNumbers = 344;

function Pages(props){
    const maxPages = Math.ceil(classroomNumbers/props.nPerPage);
    console.log(maxPages);
    let items = []
    items.push(
            <Pagination.Prev onClick={()=>props.onLoadMore(props.activePage-1)} disabled={props.activePage === 1}/>
     );
    let offsetPages = props.activePage === 1 || props.activePage === 2? 8: 6;
    let higherPageLimit = props.activePage + offsetPages> maxPages ? maxPages: props.activePage + offsetPages
    let lowerPageLimit = props.activePage + offsetPages> maxPages ? maxPages - offsetPages: props.activePage
    if(lowerPageLimit !== 1 && lowerPageLimit !== 2){
        items.push(
            <Pagination.Item key={1} onClick={()=>props.onLoadMore(1)}>
                {1}
            </Pagination.Item>
        )
        items.push(
            <Pagination.Ellipsis/>
        )
    }
    for(let number = lowerPageLimit; number <= higherPageLimit; number++){
        items.push(
            <Pagination.Item key={number} active={number==props.activePage} onClick={()=>{
               props.onLoadMore(number);
            }}>
                {number}
            </Pagination.Item>
        );
    }
    
    if(higherPageLimit !== maxPages && higherPageLimit !== maxPages-1){
        items.push(
            <Pagination.Ellipsis/>
        )
        items.push(
            <Pagination.Item key={maxPages}  onClick={()=>{
                props.onLoadMore(maxPages);
             }}>
                {maxPages}
            </Pagination.Item>
        )
    }
    items.push(
        <Pagination.Next onClick={()=>props.onLoadMore(props.activePage + 1)}/>
    )
    return (
        <Pagination >{items}</Pagination>
    )
}




export default Pages;
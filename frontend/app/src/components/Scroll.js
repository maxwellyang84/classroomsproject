import React from 'react'

const Scroll = (props) =>{
    return( //double curly bracket to indicate you're writing in javascript and you're returning an object (css)
        <div style={{overflowY: 'scroll', border: '1px solid black', height: '500px'}}> 
            {props.children}
        </div>
    )
};

export default Scroll;
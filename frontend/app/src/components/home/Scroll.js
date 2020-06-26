import React from 'react'

const Scroll = (props) =>{
    return( //double curly bracket to indicate you're writing in javascript and you're returning an object (css)
        <div style={{overflowY: 'scroll', height: '300px', borderTop: 'solid 1px black', borderBottom: 'solid 1px black', position: 'relative'}}> 
            {props.children}
        </div>
    )
};

export default Scroll;
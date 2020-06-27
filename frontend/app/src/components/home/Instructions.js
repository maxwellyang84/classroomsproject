import React from 'react';
import './Instructions.css';

function Instructions(){
    return(
        <div className="instructions">
             <h1 className="instructions-header">Instructions</h1>
              <p className="instructions-text">
                  <center>Welcome to UBC Classroom Study!</center>
                  Easily look for free classrooms to study in! First, select buildings you want to include in your search. 
                  Then, select a date and a time range and that's it!
              </p>
        </div>
    )
}

export default Instructions
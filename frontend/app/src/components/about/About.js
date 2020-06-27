import React from "react"
import Container from 'react-bootstrap/Container';
import './About.css';

function About(){
    return(
        <div className="about">
             <h1 className="about-header">About</h1>
              <p className="about-text">
                  <center>Welcome to UBC Classroom Study!</center>
                  This website is intended for students to find classrooms to study around the UBC campus. 
                  All you have to do is pick the buildings you want to search, the date, and the time range 
                  you want to study for and we will try to find the most optimal classroom for you. This is our 
                  first time building a website, using all these new tools like React, GraphQL, and MongoDB, so let us know of
                  any errors or any constructive feedback about the website you have in the Contact tab. 
              </p>
        </div>
           
        
    )
}

export default About;
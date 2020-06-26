import React from 'react';
import './App.css';
import Navbar from './components/common/Navbar'
import SearchTable from './components/home/SearchTable'
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Results from './components/home/Results';
import {Switch, Route} from 'react-router-dom';
import Home from './components/home/Home';
import About from './components/about/About';
import Contact from './components/contact/Contact';

const ACTIVITIES = gql`
  {
    getActivities{
      Activity_Type
    }
  }
`;

function App() {

  return(
    <>
    <Navbar/>
    <Switch>
      <Route path="/" component={Home} exact/>
      <Route path="/about" component={About}/>
      <Route path="/contact" component={Contact}/>
    </Switch>
    </>
  )
    


  // return (
  //   <div className="App">
  //     <p>MM</p>
  //   </div>
  // );
}

export default App;

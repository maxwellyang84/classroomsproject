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
import {Switch, Route, IndexRoute} from 'react-router-dom';
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
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About}/>
      <Route path="/contact" component={Contact}/>

      {/* <Route path="/" render={()=> <p>error 404</p>}/> */}
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

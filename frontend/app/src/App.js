import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import SearchTable from './components/SearchTable'
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ClassroomList from './components/ClassroomList';

const ACTIVITIES = gql`
  {
    getActivities{
      Activity_Type
    }
  }
`;

function App() {
  // const {loading, error, data} = useQuery(ACTIVITIES); 
  // if(loading) return <p>Loading...</p>;
  // if(error) return <p> Error :(</p>
  //   data.getActivities.map(({Activity_Type})=>{
  //     console.log(Activity_Type)
  //   })
  //   return  data.getActivities.map(({Activity_Type})=>(
  //     <div key={Activity_Type}>
  //       <p>{Activity_Type ? Activity_Type: "Nothing"}</p>
  //     </div>
  //   ))

  return(
    <>
    <Navbar name={"UBC Classroom Study"}/>
    <Container>
      <Row>
        <Col md={7}><SearchTable/></Col>
        <Col md={5}><ClassroomList/></Col>
      </Row>
    </Container>
    </>
    
   
  )
    


  // return (
  //   <div className="App">
  //     <p>MM</p>
  //   </div>
  // );
}

export default App;

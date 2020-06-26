import React from "react";
import Navbar from '../common/Navbar';
import SearchTable from './SearchTable';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Results from './Results';
import Col from 'react-bootstrap/Col';

function Home(){
    return(
        <>
        <Container>
          <Row>
            
            <SearchTable/>
          </Row>
          <Row>
            <Col md={5}><Results/></Col>
          </Row>
        </Container>
        </>
    )
}

export default Home;
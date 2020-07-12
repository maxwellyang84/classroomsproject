import React, {useState} from "react";
import Navbar from '../common/Navbar';
import SearchTable from './SearchTable';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Results from './Results';
import Col from 'react-bootstrap/Col';
import Instructions from './Instructions';
import {Switch, Route, useRouteMatch} from 'react-router-dom';


function Home(){
  let {path, url} = useRouteMatch();
  const [search, setSearch] = useState(false);
  console.log(path);
  console.log(url);

    return(
        <>
        <Container>
          <Row>      
            <SearchTable search={search} setSearch={setSearch}/>
          </Row>
          <Row>
            {search ?
              <Col md={5}><Results/></Col>:
              <Instructions/>
          }
            {/* <Switch>
              <Route exact path={path} component={Instructions}></Route>
              <Route path={`${path}search`} ><Col md={5}><Results/></Col></Route>
            </Switch> */}
            
          </Row>
        </Container>
        </>
    )
}

export default Home;
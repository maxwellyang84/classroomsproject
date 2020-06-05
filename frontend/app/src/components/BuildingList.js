import React from "react";
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';
import Building from './Building';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './BuildingList.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const BUILDINGS = gql`
 {
    getBuildings{
      Complete_Name
      Abbrev_Name
    }
  }
`;
function FullNameOverlay(Complete_Name, props){
  return (
    <Tooltip className="button-tooltip" {...props}>
      {Complete_Name}
    </Tooltip>
  )
}

function BuildingList(){
    const {loading, error, data} = useQuery(BUILDINGS);
    if(loading) return( <p>Loading...</p>);
    if(error) return (<p> ERROR :(</p>);
    return (
    <Container className="building-list">
      <Row>
     {data.getBuildings.map(({Complete_Name, Abbrev_Name})=>(
       <Col md={3}>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={(props) => FullNameOverlay(Complete_Name, props)}
          >
             <Building name={Abbrev_Name}/>
          </OverlayTrigger>  
       </Col> 
      ))}
      </Row>
    </Container>
    )


};

export default BuildingList;
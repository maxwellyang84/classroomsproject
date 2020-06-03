import React from "react";
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';
import Building from './Building';

const BUILDINGS = gql`
 {
    getBuildings{
      Complete_Name
      Abbrev_Name
    }
  }
`;
function BuildingList(){
    const {loading, error, data} = useQuery(BUILDINGS);
    if(loading) return( <p>Loading...</p>);
    if(error) return (<p> ERROR :(</p>);
    return data.getBuildings.map(({Abbrev_Name})=>(
        <Building name={Abbrev_Name}/>
    ))

};

export default BuildingList;
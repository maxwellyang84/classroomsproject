import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import {gql} from 'apollo-boost';
import {useQuery} from '@apollo/react-hooks';

const ACTIVITIES = gql`
  {
    getActivities{
      Activity_Type
    }
  }
`;

function App() {
  const {loading, error, data} = useQuery(ACTIVITIES);
  if(loading) return <p>Loading...</p>;
  if(error) return <p> Error :(</p>
    data.getActivities.map(({Activity_Type})=>{
      console.log(Activity_Type)
    })
    return  data.getActivities.map(({Activity_Type})=>(
      <div key={Activity_Type}>
        <p>{Activity_Type ? Activity_Type: "Nothing"}</p>
      </div>
    ))
    


  // return (
  //   <div className="App">
  //     <p>MM</p>
  //   </div>
  // );
}

export default App;

import React, {useState, useEffect} from "react";
import Pages from './Pages';
import ClassroomList from './ClassroomList';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import './Results.css'

const nPerPage = 4;

const RESULTS_QUERY = gql`

query ClassroomPaginationQuery($pageNumber: Int!, $nPerPage: Int!){
    ClassroomPagination(pageNumber: $pageNumber, nPerPage: $nPerPage){
        Name
    }
}
`;
function Results(){
    const {loading, data, fetchMore} = useQuery(RESULTS_QUERY,
        {
            variables:{
                pageNumber: 1,
                nPerPage: nPerPage
            },
            fetchPolicy: "cache-and-network"
        }
        )
    const [activePage, setCurrentPage] = useState(1);
   
   
    return(
        <div className="results">
            <div className="classroom-list-container">
                <ClassroomList data={data} loading={loading}/>
            </div>
            <Pages 
                onLoadMore={
                    (currentPage)=>{
                        setCurrentPage(currentPage);
                        fetchMore({
                        variables:{
                            pageNumber: currentPage,
                            nPerPage: nPerPage
                        },
                        updateQuery: (prev, {fetchMoreResult})=>{
                            if(!fetchMoreResult) return prev;
                            
                            console.log(currentPage);
                            return Object.assign({}, prev, {
                                ClassroomPagination: [...fetchMoreResult.ClassroomPagination]
                            })
                        }
                    })
                }
            }
                activePage={activePage}
                nPerPage={nPerPage}
            />
        </div>
    )
}



export default Results;
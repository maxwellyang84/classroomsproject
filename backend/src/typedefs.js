import {gql} from 'apollo-server-express'

export const typeDefs = gql`
    type Query{
        getActivities: [Activity!]!
        getClassrooms: [Classroom!]!
        getBuildings: [Building!]!
        getTopClassrooms: [Classroom!]!
        getDay(sortBy: SortBy): [Day!]!
        ClassroomPagination(pageNumber: Int!, nPerPage: Int!): [Classroom!]!
    }
    type ClassroomActivity{
        Start_Time: String!
        Date: String!
        Week_Day: String!
        Date_Time: String!
        Activity_Type: String!
        Activity_ID: ID!
    }
    type Activity{
        id: ID!
        Start_Time: String!
        Date: String!
        Activity_Type: String!
        Building: String!
        Building_Obj_Id: ID!
        Classroom_Obj_Id: ID!
        Address: String!
        Loc: String
    }
    type Day{
        id: ID!
        Start_Time: String!
        Date: String!
        Week_Day: String!
        Date_Time_Days_Only: String!
        Building: String!
        Building_Obj_Id: ID!
        Classroom: String!
        Classroom_Obj_Id: ID!
        Classroom_Activities: [ClassroomActivity!]!
        ActivityCount: Int!
        ActivityFeed(first: Int, cursor:ID): ActivityFeed
    }
    type ActivityFeed{
        cursor: String!
        Classroom_Activity: [Day]
    }
    type Building{
        Complete_Name: String!
        Abbrev_Name: String!
        Address: String!
        Lat: Int!
        Lng: Int!
    }
    type Classroom{
        Name: String!
        Building_ObjectId: ID!
        Building_Name: String!
        Building_Complete_Name: String!
        Building_Abbrev_Name: String!
        Classroom_Address: String!
        Classroom_Capacity: Int!
        Classroom_Specs: String!
        Lat: Int!
        Lng: Int!
    }
    enum Order{
        ASC
        DESC
    }
    input SortBy{
        field: String!
        order: Order!
    }

`;
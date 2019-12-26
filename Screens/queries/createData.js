import gql from 'graphql-tag';

export const createData = gql`
mutation createData ($UserID: String!){createData(input:{
    UserID: $UserID
}) {
    UserID 

  }
}`
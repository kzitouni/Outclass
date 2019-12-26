import gql from 'graphql-tag';

export const listData = gql`
query list {
  listData
  {
    items
    {
      UserID
      Type
      
    }
  }
}
`
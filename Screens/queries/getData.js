import gql from 'graphql-tag';

export default gql`
query getData {
    getData(UserID: "30303", Type: "001.0.2019/05/17/2:55")
    {
        UserID
        Indexs
        Price
    }
}`
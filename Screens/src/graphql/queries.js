// eslint-disable
// this is an auto generated file. This will be overwritten

export const getLoginModal = `query GetLoginModal($NetID: String!, $Password: String!) {
  getLoginModal(NetID: $NetID, Password: $Password) {
    NetID
    Password
    Name
  }
}
`;
export const listLoginModals = `query ListLoginModals(
  $filter: TableLoginModalFilterInput
  $limit: Int
  $nextToken: String
) {
  listLoginModals(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      NetID
      Password
      Name
    }
    nextToken
  }
}
`;

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserFavoritePet = /* GraphQL */ `
  query GetUserFavoritePet($id: ID!) {
    getUserFavoritePet(id: $id) {
      id
      userId
      petId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUserFavoritePets = /* GraphQL */ `
  query ListUserFavoritePets(
    $filter: ModelUserFavoritePetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserFavoritePets(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        petId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;

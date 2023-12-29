/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      favoritePets {
        id
        userId
        petId
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPet = /* GraphQL */ `
  query GetPet($id: ID!) {
    getPet(id: $id) {
      id
      name
      age
      gender
      status
      size
      breeds {
        primary
        secondary
        mixed
        unknown
        __typename
      }
      attributes {
        declawed
        house_trained
        shots_current
        spayed_neutered
        special_needs
        __typename
      }
      description
      photos {
        full
        large
        medium
        small
        __typename
      }
      contact {
        address {
          address1
          address2
          city
          state
        }
        email
        phone
        __typename
      }
      url
      favoriteUsers {
        id
        userId
        petId
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPets = /* GraphQL */ `
  query ListPets(
    $filter: ModelPetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        age
        gender
        status
        size
        description
        url
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUserPetFavorite = /* GraphQL */ `
  query GetUserPetFavorite($id: ID!) {
    getUserPetFavorite(id: $id) {
      id
      userId
      petId
      createdAt
      user {
        id
        username
        email
        createdAt
        updatedAt
        __typename
      }
      pet {
        id
        name
        age
        gender
        status
        size
        contact
        description
        url
        createdAt
        updatedAt
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const listUserPetFavorites = /* GraphQL */ `
  query ListUserPetFavorites(
    $filter: ModelUserPetFavoriteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserPetFavorites(
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

/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreatePet = /* GraphQL */ `
  subscription OnCreatePet($filter: ModelSubscriptionPetFilterInput) {
    onCreatePet(filter: $filter) {
      id
      name
      age
      gender
      size
      breeds {
        primary
        secondary
        mixed
        unknown
        __typename
      }
      description
      imageUrl
      contact {
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
export const onUpdatePet = /* GraphQL */ `
  subscription OnUpdatePet($filter: ModelSubscriptionPetFilterInput) {
    onUpdatePet(filter: $filter) {
      id
      name
      age
      gender
      size
      breeds {
        primary
        secondary
        mixed
        unknown
        __typename
      }
      description
      imageUrl
      contact {
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
export const onDeletePet = /* GraphQL */ `
  subscription OnDeletePet($filter: ModelSubscriptionPetFilterInput) {
    onDeletePet(filter: $filter) {
      id
      name
      age
      gender
      size
      breeds {
        primary
        secondary
        mixed
        unknown
        __typename
      }
      description
      imageUrl
      contact {
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
export const onCreateUserPetFavorite = /* GraphQL */ `
  subscription OnCreateUserPetFavorite(
    $filter: ModelSubscriptionUserPetFavoriteFilterInput
  ) {
    onCreateUserPetFavorite(filter: $filter) {
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
        size
        description
        imageUrl
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
export const onUpdateUserPetFavorite = /* GraphQL */ `
  subscription OnUpdateUserPetFavorite(
    $filter: ModelSubscriptionUserPetFavoriteFilterInput
  ) {
    onUpdateUserPetFavorite(filter: $filter) {
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
        size
        description
        imageUrl
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
export const onDeleteUserPetFavorite = /* GraphQL */ `
  subscription OnDeleteUserPetFavorite(
    $filter: ModelSubscriptionUserPetFavoriteFilterInput
  ) {
    onDeleteUserPetFavorite(filter: $filter) {
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
        size
        description
        imageUrl
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
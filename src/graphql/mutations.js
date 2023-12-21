/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
    createUser(input: $input, condition: $condition) {
      id
      username
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createPet = /* GraphQL */ `
  mutation CreatePet(
    $input: CreatePetInput!
    $condition: ModelPetConditionInput
  ) {
    createPet(input: $input, condition: $condition) {
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
export const updatePet = /* GraphQL */ `
  mutation UpdatePet(
    $input: UpdatePetInput!
    $condition: ModelPetConditionInput
  ) {
    updatePet(input: $input, condition: $condition) {
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
export const deletePet = /* GraphQL */ `
  mutation DeletePet(
    $input: DeletePetInput!
    $condition: ModelPetConditionInput
  ) {
    deletePet(input: $input, condition: $condition) {
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
export const createUserPetFavorite = /* GraphQL */ `
  mutation CreateUserPetFavorite(
    $input: CreateUserPetFavoriteInput!
    $condition: ModelUserPetFavoriteConditionInput
  ) {
    createUserPetFavorite(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const updateUserPetFavorite = /* GraphQL */ `
  mutation UpdateUserPetFavorite(
    $input: UpdateUserPetFavoriteInput!
    $condition: ModelUserPetFavoriteConditionInput
  ) {
    updateUserPetFavorite(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const deleteUserPetFavorite = /* GraphQL */ `
  mutation DeleteUserPetFavorite(
    $input: DeleteUserPetFavoriteInput!
    $condition: ModelUserPetFavoriteConditionInput
  ) {
    deleteUserPetFavorite(input: $input, condition: $condition) {
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
        createdAt
        updatedAt
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const AddFavoritePet = /* GraphQL */ `
  mutation AddFavoritePet($userId: ID!, $petId: ID!) {
    createFavoritePet(input: { userId: $userId, petId: $petId }) {
      id
      userId
      petId
      createdAt
      updatedAt
      __typename
    }
  }
`;
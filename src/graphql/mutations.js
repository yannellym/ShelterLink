/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
      }
      attributes {
        declawed
        house_trained
        shots_current
        spayed_neutered
        special_needs
      }
      description
      photos {
        full
        large
        medium
        small
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
      }
      url
      createdAt
      updatedAt
      favoriteUsers {
        id
        userId
        petId
        createdAt
        updatedAt
      }
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
      updatedAt
      user {
        id
        username
        email
        createdAt
        updatedAt
      }
      pet {
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
        }
        attributes {
          declawed
          house_trained
          shots_current
          spayed_neutered
          special_needs
        }
        description
        photos {
          full
          large
          medium
          small
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
        }
        url
        createdAt
        updatedAt
      }
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
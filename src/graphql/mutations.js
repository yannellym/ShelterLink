/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserFavoritePet = /* GraphQL */ `
  mutation CreateUserFavoritePet(
    $input: CreateUserFavoritePetInput!
    $condition: ModelUserFavoritePetConditionInput
  ) {
    createUserFavoritePet(input: $input, condition: $condition) {
      id
      userId
      petId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUserFavoritePet = /* GraphQL */ `
  mutation UpdateUserFavoritePet(
    $input: UpdateUserFavoritePetInput!
    $condition: ModelUserFavoritePetConditionInput
  ) {
    updateUserFavoritePet(input: $input, condition: $condition) {
      id
      userId
      petId
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUserFavoritePet = /* GraphQL */ `
  mutation DeleteUserFavoritePet(
    $input: DeleteUserFavoritePetInput!
    $condition: ModelUserFavoritePetConditionInput
  ) {
    deleteUserFavoritePet(input: $input, condition: $condition) {
      id
      userId
      petId
      createdAt
      updatedAt
      __typename
    }
  }
`;

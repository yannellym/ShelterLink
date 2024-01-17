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
        status
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
        status
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
        status
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
export const onCreateForum = /* GraphQL */ `
  subscription OnCreateForum($filter: ModelSubscriptionForumFilterInput) {
    onCreateForum(filter: $filter) {
      id
      title
      description
      topics {
        id
        title
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
export const onUpdateForum = /* GraphQL */ `
  subscription OnUpdateForum($filter: ModelSubscriptionForumFilterInput) {
    onUpdateForum(filter: $filter) {
      id
      title
      description
      topics {
        id
        title
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
export const onDeleteForum = /* GraphQL */ `
  subscription OnDeleteForum($filter: ModelSubscriptionForumFilterInput) {
    onDeleteForum(filter: $filter) {
      id
      title
      description
      topics {
        id
        title
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
export const onCreateTopic = /* GraphQL */ `
  subscription OnCreateTopic($filter: ModelSubscriptionTopicFilterInput) {
    onCreateTopic(filter: $filter) {
      id
      title
      forum {
        id
        title
        description
        createdAt
        updatedAt
        __typename
      }
      threads {
        id
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
export const onUpdateTopic = /* GraphQL */ `
  subscription OnUpdateTopic($filter: ModelSubscriptionTopicFilterInput) {
    onUpdateTopic(filter: $filter) {
      id
      title
      forum {
        id
        title
        description
        createdAt
        updatedAt
        __typename
      }
      threads {
        id
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
export const onDeleteTopic = /* GraphQL */ `
  subscription OnDeleteTopic($filter: ModelSubscriptionTopicFilterInput) {
    onDeleteTopic(filter: $filter) {
      id
      title
      forum {
        id
        title
        description
        createdAt
        updatedAt
        __typename
      }
      threads {
        id
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
export const onCreateThread = /* GraphQL */ `
  subscription OnCreateThread($filter: ModelSubscriptionThreadFilterInput) {
    onCreateThread(filter: $filter) {
      id
      topic {
        id
        title
        createdAt
        updatedAt
        __typename
      }
      posts {
        id
        subject
        content
        createdAt
        Favorited
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateThread = /* GraphQL */ `
  subscription OnUpdateThread($filter: ModelSubscriptionThreadFilterInput) {
    onUpdateThread(filter: $filter) {
      id
      topic {
        id
        title
        createdAt
        updatedAt
        __typename
      }
      posts {
        id
        subject
        content
        createdAt
        Favorited
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteThread = /* GraphQL */ `
  subscription OnDeleteThread($filter: ModelSubscriptionThreadFilterInput) {
    onDeleteThread(filter: $filter) {
      id
      topic {
        id
        title
        createdAt
        updatedAt
        __typename
      }
      posts {
        id
        subject
        content
        createdAt
        Favorited
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost($filter: ModelSubscriptionPostFilterInput) {
    onCreatePost(filter: $filter) {
      id
      subject
      content
      user {
        id
        username
        email
        createdAt
        updatedAt
        __typename
      }
      thread {
        id
        createdAt
        updatedAt
        __typename
      }
      createdAt
      Favorited
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost($filter: ModelSubscriptionPostFilterInput) {
    onUpdatePost(filter: $filter) {
      id
      subject
      content
      user {
        id
        username
        email
        createdAt
        updatedAt
        __typename
      }
      thread {
        id
        createdAt
        updatedAt
        __typename
      }
      createdAt
      Favorited
      updatedAt
      __typename
    }
  }
`;
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost($filter: ModelSubscriptionPostFilterInput) {
    onDeletePost(filter: $filter) {
      id
      subject
      content
      user {
        id
        username
        email
        createdAt
        updatedAt
        __typename
      }
      thread {
        id
        createdAt
        updatedAt
        __typename
      }
      createdAt
      Favorited
      updatedAt
      __typename
    }
  }
`;

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
export const onCreateTopic = /* GraphQL */ `
  subscription OnCreateTopic($filter: ModelSubscriptionTopicFilterInput) {
    onCreateTopic(filter: $filter) {
      id
      title
      posts
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
      posts
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
      posts
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
      user
      username
      topicID
      createdAt
      Favorited
      likes
      likedBy
      replies {
        id
        subject
        content
        image
        createdAt
        updatedAt
        __typename
      }
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
      user
      username
      topicID
      createdAt
      Favorited
      likes
      likedBy
      replies {
        id
        subject
        content
        image
        createdAt
        updatedAt
        __typename
      }
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
      user
      username
      topicID
      createdAt
      Favorited
      likes
      likedBy
      replies {
        id
        subject
        content
        image
        createdAt
        updatedAt
        __typename
      }
      updatedAt
      __typename
    }
  }
`;
export const onCreateReply = /* GraphQL */ `
  subscription OnCreateReply($filter: ModelSubscriptionReplyFilterInput) {
    onCreateReply(filter: $filter) {
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
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateReply = /* GraphQL */ `
  subscription OnUpdateReply($filter: ModelSubscriptionReplyFilterInput) {
    onUpdateReply(filter: $filter) {
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
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteReply = /* GraphQL */ `
  subscription OnDeleteReply($filter: ModelSubscriptionReplyFilterInput) {
    onDeleteReply(filter: $filter) {
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
      image
      createdAt
      updatedAt
      __typename
    }
  }
`;

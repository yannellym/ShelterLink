import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerUserFavoritePet = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserFavoritePet, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly petId: string;
  readonly createdAt: string;
  readonly updatedAt?: string | null;
}

type LazyUserFavoritePet = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<UserFavoritePet, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly userId: string;
  readonly petId: string;
  readonly createdAt: string;
  readonly updatedAt?: string | null;
}

export declare type UserFavoritePet = LazyLoading extends LazyLoadingDisabled ? EagerUserFavoritePet : LazyUserFavoritePet

export declare const UserFavoritePet: (new (init: ModelInit<UserFavoritePet>) => UserFavoritePet) & {
  copyOf(source: UserFavoritePet, mutator: (draft: MutableModel<UserFavoritePet>) => MutableModel<UserFavoritePet> | void): UserFavoritePet;
}
// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UserFavoritePet } = initSchema(schema);

export {
  UserFavoritePet
};
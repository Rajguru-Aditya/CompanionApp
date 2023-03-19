// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Activities = {
  "CYCLING": "CYCLING",
  "HIKING": "HIKING",
  "TREKKING": "TREKKING",
  "CONCERT": "CONCERT",
  "PARTY": "PARTY",
  "MOVIE": "MOVIE",
  "GYM": "GYM",
  "WALK": "WALK"
};

const Genders = {
  "MALE": "MALE",
  "FEMALE": "FEMALE",
  "OTHER": "OTHER"
};

const { Match, User } = initSchema(schema);

export {
  Match,
  User,
  Activities,
  Genders
};
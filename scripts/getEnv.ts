import * as is from 'predicates';
import { Maybe, none, some } from 'typescript-monads';

interface RequiredEnv {
  DISCOURSE_API_KEY: string
  DISCOURSE_BASE_URL: string
}

export function getEnv(): Maybe<RequiredEnv> {
  const { DISCOURSE_API_KEY, DISCOURSE_BASE_URL } = process.env;
  if (!is.string(DISCOURSE_API_KEY) || !is.string(DISCOURSE_BASE_URL)) {
    return none()
  }
  return some({ DISCOURSE_API_KEY, DISCOURSE_BASE_URL });
}

export function getEnvOrThrow(): RequiredEnv {
  return getEnv().valueOrThrow('Unable to get required environment variables');
}
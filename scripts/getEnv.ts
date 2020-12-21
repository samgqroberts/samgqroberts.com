import * as is from 'predicates';
import { fail, Maybe, none, ok, Result, some } from 'typescript-monads';

interface RequiredEnv {
  DISCOURSE_API_KEY: string
  DISCOURSE_BASE_URL: string
}

export function getEnv(): Result<RequiredEnv, string> {
  const { DISCOURSE_API_KEY, DISCOURSE_BASE_URL } = process.env;
  if (!is.string(DISCOURSE_API_KEY) || !is.string(DISCOURSE_BASE_URL)) {
    return fail(`DISCOURSE_API_KEY or DISCOURSE_BASE_URL not accessible as strings in the environment. Found: ${JSON.stringify({ DISCOURSE_API_KEY, DISCOURSE_BASE_URL })}`);
  }
  return ok({ DISCOURSE_API_KEY, DISCOURSE_BASE_URL });
}

export function getEnvOrThrow(): RequiredEnv {
  return getEnv().unwrap();
}
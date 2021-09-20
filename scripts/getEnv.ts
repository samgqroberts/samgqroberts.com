import * as is from 'predicates';
import { fail, ok, Result } from 'typescript-monads';

interface RequiredEnv {
  DISCOURSE_API_KEY: string;
  DISCOURSE_BASE_URL: string;
}

export function getEnv(): Result<RequiredEnv, string> {
  const retrievedValues: Partial<RequiredEnv> = {};
  const expectedStrings: (keyof RequiredEnv)[] = [
    'DISCOURSE_API_KEY',
    'DISCOURSE_BASE_URL'
  ];
  const missingStrings: (keyof RequiredEnv)[] = [];
  expectedStrings.forEach((key) => {
    const value = process.env[key];
    console.log({ key, value, missingStrings });
    if (!is.string(value)) {
      missingStrings.push(key);
    } else {
      retrievedValues[key] = value;
    }
  });
  if (missingStrings.length) {
    return fail(
      `${missingStrings.join(
        ', '
      )} not accessible as strings in the environment.`
    );
  }
  return ok(retrievedValues as RequiredEnv);
}

export function getEnvOrThrow(): RequiredEnv {
  const result = getEnv();
  if (result.isFail()) {
    throw result.unwrapFail();
  }
  return result.unwrap();
}

import { Result } from 'typescript-monads';

import { getEnv } from '../getEnv';
import BlogClient from './BlogClient';

export function blogClientFromEnv(): Result<BlogClient, string> {
  return getEnv()
    .map(
      (env) =>
        new BlogClient({
          host: env.DISCOURSE_BASE_URL,
          key: env.DISCOURSE_API_KEY
        })
    )
    .mapFail(
      (reason) => `Could not construct the blog client. Caused by: \n ${reason}`
    );
}

export function blogClientFromEnvOrThrow(): BlogClient {
  const result = blogClientFromEnv();
  if (result.isOk()) return result.unwrap();
  throw new Error(result.unwrapFail());
}

import { Maybe } from "typescript-monads";
import BlogClient from "./BlogClient";
import { getEnv } from "./getEnv";

export function blogClientFromEnv(): Maybe<BlogClient> {
  return getEnv().map(env => new BlogClient({ host: env.DISCOURSE_BASE_URL, key: env.DISCOURSE_API_KEY }));
}

export function blogClientFromEnvOrThrow(): BlogClient {
  return blogClientFromEnv().valueOrThrow('Unable to construct blog client');
}
import { EnvironmentVariables } from './environment-variables.interface';

export default (env = process.env): EnvironmentVariables => ({
  DATABASE_HOST: env.DATABASE_HOST,
  DATABASE_NAME: env.DATABASE_NAME,
  DATABASE_USER: env.DATABASE_USER,
  DATABASE_PASSWORD: env.DATABASE_PASSWORD,
  DATABASE_PORT: parseInt(env.DATABASE_PORT),
  DATABASE_CACHE_ENABLED: 0,
  DATABASE_TIMEZONE: env.DATABASE_TIMEZONE,
  JWT_SECRET: env.JWT_SECRET,
});

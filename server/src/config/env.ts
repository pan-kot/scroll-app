import dotenv from 'dotenv';

import ConfigurationError from './ConfigurationError';

export function useEnv(isProduction: boolean) {
  dotenv.config();

  if (!isProduction) {
    // Falling back to sample configuration if .env if not defined
    dotenv.config({ path: '.env.sample' });
  }
}

export function getNotNull(name: string) {
  const property = process.env[name];

  if (!property) {
    throw new ConfigurationError(`Property ${name} is not found!`);
  }

  return property;
}

export function getOneOf(name: string, options: string[]) {
  const property = getNotNull(name);

  if (!options.includes(property)) {
    throw new ConfigurationError(
      `Property ${name} has value ${property}. Expected values: ${options}.`
    );
  }

  return property;
}

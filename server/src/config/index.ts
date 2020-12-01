import { useEnv, getNotNull, getOneOf } from './env';

const environment = getOneOf('NODE_ENV', ['production', 'development', 'test']);

export const isProduction = environment === 'production';

export const isDevelopment = environment === 'development';

export const isTest = environment === 'test';

useEnv(isProduction);

export const port = getNotNull('SERVER_PORT');

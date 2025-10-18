import { EnvironmentSchema } from './environment.schema';

const {
	TRACKING_DB_URL = 'http://172.20.50.123:9988',
	REDIS_HOST = 'localhost',
	REDIS_PORT = '6379',
} = process.env;

export const env: EnvironmentSchema = {
	TRACKING_DB_URL,
	REDIS_HOST,
	REDIS_PORT: Number(REDIS_PORT),
};

import { loggerError } from '@maur025/core-logger';

export const getObjectOfString = <T>(stringValue: string): T | undefined => {
	if (!stringValue) return undefined;

	try {
		return JSON.parse(stringValue) as T;
	} catch (error) {
		loggerError(`Error parsing JSON string:`, error as Error);
		return undefined;
	}
};

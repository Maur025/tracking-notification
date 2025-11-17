import { singleton } from 'tsyringe';
import { createClient, Client } from '@u4/adbkit';
import { env } from '@config/env.js';
import { loggerError } from '@maur025/core-logger';

const { ADB_HOST, ADB_PORT, ADB_DEVICE_SERIAL } = env;

@singleton()
export default class SmsService {
	private adbClient: Client | null = null;

	public initAdbClient(): void {
		this.adbClient = createClient({
			host: ADB_HOST,
			port: ADB_PORT,
		});
	}

	public getAdbClient(): Client {
		if (!this.adbClient) {
			loggerError(`[SMS] (SmsService.getAdbClient) ADB client not initialized`);
			this.initAdbClient();

			if (!this.adbClient) {
				throw new Error(
					`[SMS] (SmsService.getAdbClient) ADB client not initialized]`,
				);
			}

			return this.adbClient;
		}

		return this.adbClient;
	}

	public verifyAdbConnections = async (): Promise<boolean> => {
		const deviceSerials = ADB_DEVICE_SERIAL.split(',');

		const devices = await this.getAdbClient().listDevices();
		console.log(devices);

		return !!devices.filter(device => deviceSerials.includes(device.id)).length;
	};
}

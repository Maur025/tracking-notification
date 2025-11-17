import { container } from 'tsyringe';
import EmailService from './service/channel/email-service.js';
import { getEmailChannelParams } from './util/get-email-channel-params.js';
import WhatsappService from './service/channel/whatsapp-service.js';
import { Channel } from '@module/channel/schema/channel.js';
import ChannelCache from '@module/channel/cache/channel-cache.js';
import SmsService from './service/channel/sms-service.js';
import { loggerInfo, loggerWarn } from '@maur025/core-logger';

export const notificationChannelInit = async (): Promise<void> => {
	const channelCache = container.resolve(ChannelCache);

	const emailChannelData: Channel | undefined = channelCache.getChannel('1');

	if (emailChannelData?.data?.params) {
		const emailService = container.resolve(EmailService);
		const { server, port, ssl, username, password } = getEmailChannelParams(
			emailChannelData?.data?.params,
		);

		await emailService.initialize({
			host: server,
			port,
			withSsl: ssl,
			auth: { user: username, pass: password },
		});
	}

	const whatsappService = container.resolve(WhatsappService);
	await whatsappService.initialize();

	const smsService = container.resolve(SmsService);
	smsService.initAdbClient();
	const isAdbConnected = await smsService.verifyAdbConnections();

	if (isAdbConnected) {
		loggerInfo(
			`[SMS] (notificationChannelInit) ADB connected successfully, with devices available`,
		);
	} else {
		loggerWarn(
			`[SMS] (notificationChannelInit) No ADB devices connected, without devices available`,
		);
	}
};

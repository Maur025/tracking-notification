import { container } from 'tsyringe';
import EmailService from './service/channel/email-service.js';
import { getEmailChannelParams } from './util/get-email-channel-params.js';
import WhatsappService from './service/channel/whatsapp-service.js';
import { Channel } from '@module/channel/schema/channel.js';
import ChannelCache from '@module/channel/cache/channel-cache.js';

export const notificationChannelInit = async (): Promise<void> => {
	const channelCache = container.resolve(ChannelCache);

	const emailChannelData: Channel | undefined = channelCache.getChannel('1');

	if (emailChannelData) {
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
};

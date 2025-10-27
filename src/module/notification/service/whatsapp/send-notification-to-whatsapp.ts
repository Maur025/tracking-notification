import { loggerDebug } from '@maur025/core-logger';
import { container } from 'tsyringe';
import WhatsappService from '../channel/whatsapp-service.js';
import { NotifyToWhatsappSchema } from '../../schema/notify-to-whatsapp.schema.js';

const WHATSAPP_URL = 'https://web.whatsapp.com';

export const sendNotificationToWhatsapp = async (
	request: NotifyToWhatsappSchema,
): Promise<void> => {
	const { numberPhone, message } = NotifyToWhatsappSchema.parse(request);

	const whatsappService = container.resolve(WhatsappService);

	const textoUrl = encodeURIComponent(message);

	const browserHeadless = await whatsappService.getWhatsappBrowser();

	const pageToSend = await browserHeadless.newPage();
	await pageToSend.goto(
		`${WHATSAPP_URL}/send?phone=591${numberPhone}&text=${textoUrl}`,
	);

	const buttonSend = await pageToSend.waitForSelector('[aria-label="Send"]', {
		state: 'visible',
	});

	await buttonSend.click();

	await pageToSend.waitForTimeout(1000);
	await pageToSend.close();

	loggerDebug(
		`[WHATSAPP] (sendNotificationToWhatsapp) notification sent to number: ${numberPhone}`,
	);
};

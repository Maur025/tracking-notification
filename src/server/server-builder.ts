import express, {
	Application,
	Router,
	Request,
	Response,
	NextFunction,
} from 'express';
import z, { enum as enum_ } from 'zod';
import { ServerBuilderSchema } from './server-builder.schema';
import { Server } from 'http';
import { loggerInfo } from '@maur025/core-logger';

const RouteType = enum_(['FILE', 'API']);
const RestType = enum_(['get', 'post', 'put', 'delete']);

type RouteType = z.infer<typeof RouteType>;
type RestType = z.infer<typeof RestType>;

export class ServerBuilder {
	private host?: string;
	private port?: number;

	constructor(private readonly app: Application) {}

	public static builder(): ServerBuilder {
		return new ServerBuilder(express());
	}

	public withConfiguration(config: () => void): this {
		config();
		return this;
	}

	public withMiddleware(
		middleware: (req: Request, res: Response, next: NextFunction) => void,
	): this {
		this.app.use(middleware);

		return this;
	}

	public withRoute(
		route: [string, Router | ((req: Request, res: Response) => void)],
		type: RouteType = 'FILE',
		method: RestType = 'get',
	): this {
		const [path, handler] = route;

		if (type === 'FILE') {
			this.app.use(path, handler);
			return this;
		}

		this.app[method](path, handler);
		return this;
	}

	public withHost(host?: string): this {
		if (!host) return this;

		this.host = host;
		return this;
	}

	public withPort(port: number): this {
		this.port = port;
		return this;
	}

	public build(): ServerBuilderSchema {
		return {
			getApplication: () => this.app,
			startServer: () => this.startServerApp(),
		};
	}

	private startServerApp(): Server {
		if (!this.port) {
			throw new Error('Port must be defined to start the server');
		}

		if (!this.host) {
			return this.app.listen(this.port, () =>
				loggerInfo(this.serverRunningMessage()),
			);
		}

		return this.app.listen(this.port, this.host, () =>
			loggerInfo(this.serverRunningMessage()),
		);
	}

	serverRunningMessage = (): string =>
		`[EXPRESS] server running on http(s)://${this.host ?? 'localhost'}:${this.port ? this.port : ''}`;
}

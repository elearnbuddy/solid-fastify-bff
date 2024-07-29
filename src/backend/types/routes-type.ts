import { IncomingMessage, ServerResponse } from "http";
import {
	RouteHandlerMethod,
	RawServerDefault,
	RouteGenericInterface,
	FastifySchema,
	FastifyTypeProvider,
	FastifyBaseLogger,
	FastifyPluginCallback,
	FastifyPluginOptions,
} from "fastify";

export type RouteMethod = RouteHandlerMethod<
	RawServerDefault,
	IncomingMessage,
	ServerResponse<IncomingMessage>,
	RouteGenericInterface,
	unknown,
	FastifySchema,
	FastifyTypeProvider,
	FastifyBaseLogger
>;

export type Routes = FastifyPluginCallback<
	FastifyPluginOptions,
	RawServerDefault,
	FastifyTypeProvider,
	FastifyBaseLogger
>;

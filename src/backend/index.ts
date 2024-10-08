// Import the framework and instantiate it
import Fastify from "fastify";
import "dotenv/config";
import { routes } from "./api/routes";
import session from "@fastify/session";
import cookie from "@fastify/cookie";
import fastifyMultipart from "@fastify/multipart";

const fastify = Fastify({
	logger: true,
});

fastify.register(cookie, {
	hook: "onRequest",
	secret: process.env.APP_SECRET,
	parseOptions: {
		domain: "/",
		httpOnly: true,
		sameSite: false,
	},
});

fastify.register(session, { secret: process.env.APP_SECRET ?? "secret" });

fastify.register(fastifyMultipart);

fastify.register(routes, { prefix: "/api" });

// Run the server!
fastify.listen(
	{
		port: 3001,
		host: "0.0.0.0",
	},
	(err, address) => {
		if (err) {
			fastify.log.error(err);
			process.exit(1);
		}

		// eslint-disable-next-line no-console
		console.log(`Server is now listening on ${address}`);
	}
);

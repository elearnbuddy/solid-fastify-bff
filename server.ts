// Import the framework and instantiate it
import Fastify from "fastify";
import "dotenv/config";
import { routes } from "./src/backend/api/routes";
import FastifyStatic from "@fastify/static";
import cookie from "@fastify/cookie";
import session from "@fastify/session";
import { cacheHeader } from "pretty-cache-header";
import fastifyMultipart from "@fastify/multipart";
import path from "path";

const fastify = Fastify({
	logger: false,
});

fastify.register(cookie, {
	hook: "onRequest",
	secret: process.env.APP_SECRET,
	parseOptions: {
		domain: "/",
		httpOnly: true,
		sameSite: true,
	},
});

fastify.register(session, { secret: process.env.APP_SECRET ?? "secret" });

fastify.register(fastifyMultipart);

fastify.register(routes, { prefix: "/api" });

fastify.register(FastifyStatic, {
	root: path.join(__dirname, "public"),
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	allowedPath(pathName, _root, _request) {
		return !pathName.startsWith("/api");
	},
	preCompressed: true,
	cacheControl: false,
	setHeaders(res, pathName) {
		if (
			path.basename(pathName).endsWith(".html") ||
			path.basename(pathName).endsWith(".html.br") ||
			path.basename(pathName).endsWith(".html.gz")
		) {
			res.setHeader("Cache-Control", "no-cache, must-revalidate");
		} else {
			res.setHeader(
				"Cache-Control",
				cacheHeader({
					public: true,
					maxAge: "1 year",
					immutable: true,
				})
			);
		}
	},
});

fastify.setNotFoundHandler((req, reply) => {
	// API 404
	if (req.raw.url && req.raw.url.startsWith("/api")) {
		return reply.status(404).send({ error: "Page not found" });
	}

	return reply.status(200).sendFile("index.html");
});

// Run the server!
fastify.listen(
	{
		port: parseInt(process.env.PORT ?? "3000", 10),
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

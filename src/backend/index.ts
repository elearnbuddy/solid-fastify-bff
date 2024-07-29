// Import the framework and instantiate it
import Fastify from "fastify";
import "dotenv/config";
import { routes } from "./api/routes";

const fastify = Fastify({
	logger: true,
});

fastify.register(routes, { prefix: "/api" });

// Run the server!
fastify.listen(
	{
		port: parseInt(process.env.PORT ?? "3001", 10),
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

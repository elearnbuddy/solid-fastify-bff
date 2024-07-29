import { RouteMethod } from "../../types/routes-type";

export const helloRoute: RouteMethod = (_request, reply) => {
	return reply.status(200).send({ hello: "world" });
};

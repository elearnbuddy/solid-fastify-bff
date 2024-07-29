import { Routes } from "../types/routes-type";
import { helloRoute } from "./methods/hello";

export const routes: Routes = (fastify, _opts, done) => {
	fastify.get("/hello", helloRoute);

	done();
};

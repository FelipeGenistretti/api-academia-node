import { appRoutes } from "./http/controllers/routes.js";
import fastify from "fastify";

export const app = fastify();

app.register(appRoutes)


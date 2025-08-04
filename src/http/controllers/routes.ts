import type { FastifyInstance } from "fastify";
import { RegisterController } from "./register-controller.js";

const registerController = new RegisterController()

export async function appRoutes(app: FastifyInstance){
    app.post('/users', registerController.register)
}

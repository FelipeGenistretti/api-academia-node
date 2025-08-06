import type { FastifyInstance } from "fastify";
import { RegisterController } from "./controllers/register-controller.js";
import { AuthenticateController } from "./controllers/autheticate-controller.js";

const registerController = new RegisterController()
const authenticateController = new AuthenticateController()

export async function appRoutes(app: FastifyInstance){
    app.post('/users', registerController.register)
    app.post('/sessions', authenticateController.authenticate)
}

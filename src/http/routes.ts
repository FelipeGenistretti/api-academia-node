import type { FastifyInstance } from "fastify";
import { RegisterController } from "./controllers/register-controller.js";
import { AuthenticateController } from "./controllers/autheticate-controller.js";
import { ProfileController } from "./controllers/profile-controller.js";

const registerController = new RegisterController()
const authenticateController = new AuthenticateController()
const profileController = new ProfileController() 

export async function appRoutes(app: FastifyInstance){
    app.post('/users', registerController.register)
    app.post('/sessions', authenticateController.authenticate)

    /**Authenticated */
    app.get('/me', profileController.profile)
}

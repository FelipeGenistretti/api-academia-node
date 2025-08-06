import { PrismaUsersRepository } from "@/repositories/prisma-users-repository.js";
import { AuthenticateService } from "../authenticate-service.js";

function makeAuthenticateService(){
    const usersRepository = new PrismaUsersRepository()
    const authenticateService = new AuthenticateService(usersRepository)

    return authenticateService

}

export { makeAuthenticateService }
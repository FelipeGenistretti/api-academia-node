import { PrismaUsersRepository } from "@/repositories/prisma-users-repository.js";
import { RegisterUserService } from "../register-user-service.js";

function makeRegisterUserService(){
    const usersRepository = new PrismaUsersRepository()
    const registerUserService = new RegisterUserService(usersRepository)

    return registerUserService

}

export { makeRegisterUserService }
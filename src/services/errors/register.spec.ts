import { expect, test, describe, it } from "vitest"
import { RegisterUserService } from "../register-user-service.js"
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository.js"

describe('Register User Service', ()=>{
    it('should hash user password upon registration', async ()=>{
        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUserService = new RegisterUserService(prismaUsersRepository)

        const { user } = await registerUserService.execute({
            name:"john doe",
            email : "johndoe@example.com",
            password: "123456"
        })

        console.log(user.password);
        
    })
})
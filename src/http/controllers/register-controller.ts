import { z } from "zod";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import type { FastifyRequest, FastifyReply } from "fastify";
import { RegisterUserService } from '@/services/register-user-service';
import { PrismaUsersRepository } from "@/";
import { UserAlreadyExistsError } from "@/";




class RegisterController {
    async register(request:FastifyRequest, response:FastifyReply){
        const bodySchema = z.object({
                name: z.string(),
                email : z.string().email(),
                password : z.string().min(6)
            })
        
            const { name, email, password } = await bodySchema.parseAsync(request.body)
            const service = new RegisterUserService();

            try {
                const usersRepository = new PrismaUsersRepository()
                const registerUserService = new RegisterUserService(usersRepository)

                await registerUserService.execute({
                    name,
                    email,
                    password
                })
            } catch (error) {
                if(error instanceof UserAlreadyExistsError){
                    return response.status(409).send()
                }
                
                throw error
            }
        
            return response.status(201).send()
    }
}

export { RegisterController }
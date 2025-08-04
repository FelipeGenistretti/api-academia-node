import { z } from "zod";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import type { FastifyRequest, FastifyReply } from "fastify";
import { RegisterUserService } from '@/services/register-user-service';




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
                await service.execute({
                    name,
                    email,
                    password
                })
            } catch (error) {
                return response.status(409).send()
            }
        
            return response.status(201).send()
    }
}

export { RegisterController }
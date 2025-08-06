import { z } from "zod"
import type { FastifyRequest, FastifyReply } from "fastify"
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error.js"
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service.js"

class AuthenticateController {
    async authenticate(request: FastifyRequest, response: FastifyReply) {
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        })
 
        const { email, password } = await bodySchema.parseAsync(request.body)

        try {
            const authenticateService = makeAuthenticateService()

            await authenticateService.execute({
                email,
                password
            })
        } catch (error) {
            if (error instanceof InvalidCredentialsError) {
                return response.status(400).send()
            }

            throw error
        }

        return response.status(201).send()
    }
}

export { AuthenticateController }

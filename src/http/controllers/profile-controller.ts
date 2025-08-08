import { z } from "zod"
import type { FastifyRequest, FastifyReply } from "fastify"
import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error.js"
import { makeAuthenticateService } from "@/services/factories/make-authenticate-service.js"

class AuthenticateController {
    async profile(request: FastifyRequest, response: FastifyReply) {
        return response.status(201).send()
    }
}

export { AuthenticateController }

import { error } from "console";
import { appRoutes } from "./http/controllers/routes.js";
import fastify from "fastify";
import { ZodError } from "zod";

export const app = fastify();

app.register(appRoutes)

app.setErrorHandler((error, request, response)=>{
    if(error instanceof ZodError){
        return response.status(400)
    }
})

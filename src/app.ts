import { appRoutes } from "./http/controllers/routes.js";
import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env/index.js";
import fastifyJwt from "@fastify/jwt";



export const app = fastify();

app.register(fastifyJwt, {
    secret:env.JWT_SECRET,
})

app.register(appRoutes)

app.setErrorHandler((error, _, response)=>{
    if(error instanceof ZodError){
        return response.status(400).send({message:"Validation Error", issues:error.format()})
    }

    if(env.NODE_ENV !== "production"){
        console.log(error);
        
    } else {

    }

    return response.status(500).send({message:"internal server error"})
})

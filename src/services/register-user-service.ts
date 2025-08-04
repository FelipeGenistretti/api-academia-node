import { hash } from "bcryptjs"
import { prisma } from "./lib/prisma"

interface RegisterUserServiceRequest{
    name:string, 
    email:string
    password:string
}


class RegisterUserService{
    async execute({
        name,
        email,
        password
    }:RegisterUserServiceRequest){
        await this.ensureEmailIsUnique(email)
        
        const hashedPassord = await this.hashPassword(password)

        const user = await this.createUser({
            name, email, password:hashedPassord
        })
        return user
    }

    private async hashPassword(password:string){
        return await hash(password, 8)
    }

    private async ensureEmailIsUnique(email:string){
        const userExists = await prisma.user.findUnique({
            where:{email}
        })

        if (userExists){
            throw new Error("email already exists")
        }
    }

     private async createUser(data: RegisterUserServiceRequest) {
        return await prisma.user.create({ data });
    }
    
}

export { RegisterUserService }
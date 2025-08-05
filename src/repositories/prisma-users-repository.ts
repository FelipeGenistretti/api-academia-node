import { prisma } from "@/lib/prisma.js" 
import type { UsersRepository } from "./users-repository.js"
import { User } from "@prisma/client"


interface UserRequest{
    name:string, 
    email:string
    password:string
}

class PrismaUsersRepository implements UsersRepository{
    async findByEmail(email: string): Promise<User | null> {
       const user = await prisma.user.findUnique({
            where:{email}
        })

        return user
    }
    async create(data:UserRequest) {
        const user = await prisma.user.create({
            data,
        })
        return user
    }


}

export { PrismaUsersRepository }
import { prisma } from "@/lib/prisma.js" 
import type { GymsRepository } from "./gyms-repository.js"
import { Gym } from "@prisma/client"


interface UserRequest{
    name:string, 
    email:string
    password:string
}

class PrismaGymsRepository implements GymsRepository{
    async findById(id: string): Promise<Gym | null> {
        return 
        
    }

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

export { PrismaGymsRepository }
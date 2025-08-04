import { prisma } from "@/lib/prisma"


interface UserRequest{
    name:string, 
    email:string
    password:string
}

class PrismaUsersRepository {
    async create(data:UserRequest) {
        const user = await prisma.user.create({
            data,
        })
        return user
    }

}

export { PrismaUsersRepository }
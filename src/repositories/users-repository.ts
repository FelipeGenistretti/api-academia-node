import { Prisma, User } from "@prisma/client"

interface UsersRequests {
    name:string
    email: string
    password :string
}

export interface UsersRepository {
    findById(id:string) : Promise<User | null>
    findByEmail(email:string) : Promise<User | null>
    create(data:UsersRequests): Promise<User>
}
import { CheckIn, User } from "@prisma/client"

interface CheckInsRequests {
    userId:string
    gymId:string
}

export interface CheckInsRepository {
    create(data:CheckInsRequests):Promise<CheckIn>
    findById(id:string):Promise<User | null>
}
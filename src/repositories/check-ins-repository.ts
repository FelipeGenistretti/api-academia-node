import { CheckIn, User } from "@prisma/client"

interface CheckInsRequests {
    userId:string
    gymId:string
}

export interface CheckInsRepository {
    create(data:CheckInsRequests):Promise<CheckIn>
    findById(id:string):Promise<CheckIn | null>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    countByUserId(user_id:string):Promise<number>
    findManyByUserId(user_id:string, page:number):Promise<CheckIn[]>
}
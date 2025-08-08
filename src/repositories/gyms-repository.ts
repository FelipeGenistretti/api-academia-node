import { Gym } from "@prisma/client"

export interface CreateGymRequest{
    title: string
    description? : string 
    phone : string | null
    latitude : number
    longitude : number
}

export interface FindManyNearbyParams {
    latitude:number
    lontitude:number
}

export interface GymsRepository {
    findById(id:string):Promise<Gym | null>
    searchMany(query:string, page:number):Promise<Gym[]>
    //searchManyNearby(params: FindManyNearbyParams):Promise<Gym[]>
    create(data:CreateGymRequest): Promise<Gym>
}
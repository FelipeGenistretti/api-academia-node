import { GymsRepository } from "@/repositories/gyms-repository.js"
import { Gym } from "@prisma/client"

interface FetchNearbyServiceRequest{
    userLatitude: number
    userLongitude:number
}

interface FetchNearbyServiceResponse{
    gyms: Gym[]
}

class FetchNearbyService{

    constructor(
       private gymsRepository: GymsRepository,
    ) {

    }

    async execute({
        userLatitude,
        userLongitude
    }:FetchNearbyServiceRequest):Promise<FetchNearbyServiceResponse>{

        const gyms = await this.gymsRepository.searchMany(query, page)

        return {
            gyms,
        }

    }

}

export { SearchGymsService }
import { CheckIn, User } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository.js";
import { GymsRepository } from "@/repositories/gyms-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates.js";

interface CheckInServiceRequest {
    userId:string
    gymId:string
    userLatitude:number
    userLongitude:number
}

interface CheckInServiceResponse  {
    checkIn : CheckIn
}

class CheckInService {
    constructor(
        private checkInsRepository : CheckInsRepository,
        private gymsRepository : GymsRepository
    ){

    }

    async execute({ userId, gymId, userLatitude, userLongitude }:CheckInServiceRequest):Promise<CheckInServiceResponse>{
        const gym = await this.gymsRepository.findById(gymId)

        if (!gym) {
            throw new ResourceNotFoundError()
        }

        const distance = getDistanceBetweenCoordinates(
            {latitude:userLatitude, longitude:userLongitude},
            {latitude:gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
        )

        const MAX_DISTANCE_IN_KM = 0.1

        if(distance > MAX_DISTANCE_IN_KM){
            throw new Error()
        }

        const user = await this.checkInsRepository.findById(userId)

        if(!user){
            throw new Error("User not exits")
        }

        const checkIn = await this.checkInsRepository.create({
            userId,
            gymId
        })

        return {
            checkIn
        }
    }
}

export { CheckInService }
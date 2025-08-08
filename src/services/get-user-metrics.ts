import { CheckIn, User } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository.js";
import { GymsRepository } from "@/repositories/gyms-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates.js";

interface GetUserMetricsServiceRequest {
    userId:string
}

interface GetUserMetricsServiceResponse  {
    checkInsCount : number
}

class GetUserMetricsService {
    constructor(
        private checkInsRepository : CheckInsRepository
    ){

    }

    async execute({ userId }:GetUserMetricsServiceRequest):Promise<GetUserMetricsServiceResponse>{
        const checkInsCount = await this.checkInsRepository.countByUserId(userId)

        return {
            checkInsCount,
        }
    }
}

export { GetUserMetricsService }
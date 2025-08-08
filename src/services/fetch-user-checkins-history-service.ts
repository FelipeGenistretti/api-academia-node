import { CheckIn, User } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository.js";
import { GymsRepository } from "@/repositories/gyms-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates.js";

interface FetchUserCheckInsHistoryServiceRequest {
    userId:string
    page:number
}

interface FetchUserCheckInsHistoryServiceResponse  {
    checkIns : CheckIn[]
}

class FetchUserCheckInsHistoryService {
    constructor(
        private checkInsRepository : CheckInsRepository,
        private gymsRepository : GymsRepository
    ){

    }

    async execute({ userId, page }:FetchUserCheckInsHistoryServiceRequest):Promise<FetchUserCheckInsHistoryServiceResponse>{
        const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

        return {
            checkIns,
        }
    }
}

export { FetchUserCheckInsHistoryService }
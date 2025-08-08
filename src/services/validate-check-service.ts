import { CheckIn, User } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates.js";
import dayjs from "dayjs";

interface ValidadeCheckinServiceRequest {
    checkInId:string
}

interface ValidadeCheckinServiceResponse  {
    checkIn : CheckIn
}

class ValidadeCheckinService {
    constructor(
        private checkInsRepository : CheckInsRepository,
    ){

    }

    async execute({ checkInId }:ValidadeCheckinServiceRequest):Promise<ValidadeCheckinServiceResponse>{
        const checkIn = await this.checkInsRepository.findById(checkInId)

        if (!checkIn) {
            throw new ResourceNotFoundError()
        }

        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.createdAd,
            'minutes'
        )

        if (distanceInMinutesFromCheckInCreation > 20){
            throw new Error()
        }

        checkIn.validatedAt = new Date()
        return {
            checkIn
        }
    }
}

export { ValidadeCheckinService }
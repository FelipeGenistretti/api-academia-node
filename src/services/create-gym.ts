import { GymsRepository } from "@/repositories/gyms-repository.js"
import { Gym } from "@prisma/client"

interface CreateGymServiceRequest{
    title: string
    description? : string 
    phone : string
    latitude : number
    longitude : number
}

interface CreateGymServiceResponse{
    gym: Gym
}

class CreateGymService{

    constructor(
       private gymsRepository: GymsRepository,
    ) {

    }

    async execute({
        title,
        description,
        phone,
        latitude,
        longitude
    }:CreateGymServiceRequest){

        const gym = await this.gymsRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude
        })

        return { gym }

    }

}

export { CreateGymService }
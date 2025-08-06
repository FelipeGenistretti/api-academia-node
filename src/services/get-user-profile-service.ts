import { UsersRepository } from "@/repositories/users-repository.js";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";

interface GetUserProfileServiceRequest {
    userId:string
}

interface GetUserProfileServiceResponse  {
    user: User
}

class GetUserProfileService {
    constructor(
        private usersRepository : UsersRepository,
    ){

    }

    async execute({ userId }:GetUserProfileServiceRequest):Promise<GetUserProfileServiceResponse>{
        const user = await this.usersRepository.findById(userId)

        if(!user){
            throw new ResourceNotFoundError()
        }

        return {
            user,
        }
    }
}

export { GetUserProfileService }
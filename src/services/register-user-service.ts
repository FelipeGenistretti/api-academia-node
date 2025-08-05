import type { UsersRepository } from "@/"
import { UserAlreadyExistsError } from "@/"
import { hash } from "bcryptjs"

interface RegisterUserServiceRequest{
    name:string, 
    email:string
    password:string
}

class RegisterUserService{

    constructor(
       private usersRepository: UsersRepository,
    ) {

    }

    async execute({
        name,
        email,
        password
    }:RegisterUserServiceRequest){
        const userWithSameEmail = await this.usersRepository.findByEmail(email)

        if (userWithSameEmail){
            throw new UserAlreadyExistsError()
        }
        const hashedPassord = await this.hashPassword(password)

        await this.usersRepository.create({
            name,
            email,
            hashedPassord
        })

    }

    private async hashPassword(password:string){
        return await hash(password, 8)
    }

}

export { RegisterUserService }
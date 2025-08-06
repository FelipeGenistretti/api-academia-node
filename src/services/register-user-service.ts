import type { UsersRepository } from "@/repositories/users-repository.js"
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error.js"
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
        const hashedPassword = await this.hashPassword(password)

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        })

        return { user }

    }

    private async hashPassword(password:string){
        return await hash(password, 8)
    }

}

export { RegisterUserService }
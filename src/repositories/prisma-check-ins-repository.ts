import { prisma } from "@/lib/prisma.js"
import { CheckInsRepository } from "./check-ins-repository.js"
import { CheckIn, User } from "@prisma/client"
import dayjs from "dayjs"

interface CheckInsRequest {
  userId: string
  gymId: string
  validateAt?: Date 
}

class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    return user
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfDay = dayjs(date).startOf("day").toDate()
    const endOfDay = dayjs(date).endOf("day").toDate()

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        createAd: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    })

    return checkIn
  }

  async create(data: CheckInsRequest): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({
      data: {
        user_id: data.userId,
        gym_id: data.gymId,
        validatedAt: data.validateAt ?? null,
      },
    })

    return checkIn
  }
}

export { PrismaCheckInsRepository }

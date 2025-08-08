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

  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId
      }
    })
    return count
  }

  
  async findById(checkInId: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: { id:checkInId },
    })

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null> {
    const startOfDay = dayjs(date).startOf("day").toDate()
    const endOfDay = dayjs(date).endOf("day").toDate()

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        createdAd: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    })

    return checkIn
  }

  async findManyByUserId(user_id: string, page:number): Promise<CheckIn[]> {
    const pageSize = 15
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: user_id
      },
      skip:(page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAd:'desc'
      }
    })
    
    return checkIns
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

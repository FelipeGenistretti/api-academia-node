import { prisma } from "@/lib/prisma.js" 
import type { FindManyNearbyParams, GymsRepository } from "./gyms-repository.js"
import { Gym } from "@prisma/client"
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates.js"

interface CreateGymRequest {
  title: string
  description?: string 
  phone: string
  latitude: number
  longitude: number
}

class PrismaGymsRepository implements GymsRepository {

  async searchMany(query: string, page: number): Promise<Gym[]> {
      const gyms = await prisma.gym.findMany({
        where: {
          title: {
            contains: query,
            mode: "insensitive" 
          }
        },
        take: 20, 
        skip: (page - 1) * 20 
      })

      return gyms
    }

  async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findUnique({
      where: { id }
    })
    return gym
  }

  async create(data: CreateGymRequest) {
    const gym = await prisma.gym.create({
      data,
    })
    return gym
  }
}

export { PrismaGymsRepository }

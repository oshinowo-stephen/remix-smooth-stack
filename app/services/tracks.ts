import { Track, PrismaClient } from '@prisma/client'

const { track } = new PrismaClient()

export const insert = async (data: Track): Promise<void> => {
  try {
    await track.create({ data })
  } catch (_error) {
    console.error(_error)

    throw new Error('Unhandled Rejection.')
  }
}

export const fetch = async (title: string): Promise<Track> => {
  try {
    const result = await track.findUnique({
      where: {
        title,
      },
    })

    if (!result) {
      throw new Error('Invalid Track.')
    }

    return result
  } catch (_error) {
    console.error(_error)

    throw new Error('Unhandled Error.')
  }
}

export const fetchAll = async (): Promise<Track[]> => {
  try {
    const result = await track.findMany()

    if (result.length === 0) {
      console.log('No tracks found.')

      return []
    }

    return result
  } catch (_error) {
    console.error(_error)

    throw new Error('Unhandled Error.')
  }
}

export const fetchAllFromPlaylist = async (list: string): Promise<Track[]> => {
  try {
    const result = await track.findMany({
      where: {
        playlist: list,
      },
    })

    if (result.length === 0) {
      throw new Error('Invalid List.')
    }

    return result
  } catch (_error) {
    console.error(_error)

    throw new Error('Unhandled Error.')
  }
}

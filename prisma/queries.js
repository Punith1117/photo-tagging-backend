const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

const createPlayer = async (playerName) => {
    const newPlayer = await prisma.player.create({
        data: {
            name: playerName
        }
    })
    return newPlayer
}

const playerExists = async (playerName) => {
    const count = await prisma.player.count({
        where: {
            name: playerName
        }
    })

    return (count > 0) ? true : false
}

const getLeaderboard = async (count) => {
    const players = await prisma.player.findMany({
        take: count, // number of rows to select
        orderBy: {
            timeTaken: 'asc'
        },
        where: {
            timeTaken: {
                not: null
            }
        },
        select: {
            name: true,
            timeTaken: true
        }
    })
    return players
}

module.exports = {
    createPlayer,
    playerExists,
    getLeaderboard
}
const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

const createPlayer = async (playerName) => {
    const newPlayer = await prisma.player.create({
        data: {
            name: playerName
        }
    })

    const objects = await prisma.object.findMany()

    await prisma.playerObject.createMany({
        data: objects.map(obj => ({
            playerId: newPlayer.id,
            objectId: obj.id
        }))
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

const getTimeTakenByPlayer = async (id) => {
    const row = await prisma.player.findUnique({
        where: {
            id
        },
        select: {
            timeTaken: true
        }
    })
    return row.timeTaken
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

const getPlayerObjects = async (playerId) => {
    const playerObjects = await prisma.playerObject.findMany({
        where: {
            playerId
        }
    })
    return playerObjects
}

const setObjectsNotFound = async (playerId) => {
    await prisma.playerObject.updateMany({
        where: {
            playerId
        },
        data: {
            found: false
        }
    })
}

module.exports = {
    createPlayer,
    playerExists,
    getLeaderboard,
    getTimeTakenByPlayer,
    getPlayerObjects,
    setObjectsNotFound
}
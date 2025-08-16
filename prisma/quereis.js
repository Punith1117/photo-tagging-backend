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

module.exports = {
    createPlayer,
    playerExists
}
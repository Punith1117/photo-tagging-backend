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

module.exports = {
    createPlayer
}
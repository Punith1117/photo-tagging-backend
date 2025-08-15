const { PrismaClient } = require('../generated/prisma')
const prisma = new PrismaClient()

const createPlayer = async (playerName) => {
    await prisma.player.create({
        data: {
            name: playerName
        }
    })
}

module.exports = {
    createPlayer
}
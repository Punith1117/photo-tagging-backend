const { PrismaClient } = require('./generated/prisma')
const prisma = new PrismaClient()

async function syncNewObjects() {
    const objectCount = await prisma.object.count()
    const objectsOfEachPlayer = await prisma.playerObject.findMany({
        distinct: ['objectId']
    }) // finds rows with distinct objectId

    if (objectCount > objectsOfEachPlayer.length) {
        const players = await prisma.player.findMany()
        for (let i = (objectsOfEachPlayer.length+1); i <= objectCount; i++) {
            await prisma.playerObject.createMany({
                data: players.map(p => ({
                    objectId: i,
                    playerId: p.id
                }))
            })
        }
        console.log('Synced successfully.')
    } else {
        console.log('Objects are already in sync.')
    }
}

syncNewObjects()
    .catch(e => console.error(e))
    .finally(async () => prisma.$disconnect())
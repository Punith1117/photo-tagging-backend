const jwt = require('jsonwebtoken')
const { getPlayerObjects, setObjectsNotFound, getObject, setObjectFound, getTimeTakenByPlayer, setTimeTaken } = require('../prisma/queries')

const newGameController = async (req, res) => {
    const { id, playerName } = req.user
    const token = jwt.sign({
        id,
        playerName
    }, process.env.GAME_JWT_SECRET, {expiresIn: 50})

    await setObjectsNotFound(id)
    const initialObjects = await getPlayerObjects(id)

    res.json({
        token,
        initialObjects
    })
}

const verifyGuessController = async (req, res) => {
    const {id, iat} = req.user
    let currentObjects = await getPlayerObjects(id)

    if (currentObjects.every(obj => obj.found == true)) {
        res.json({
            'message': 'The game has been already completed'
        })
        return
    }

    const { coordinates, objectId } = req.body
    const object = await getObject(objectId)
    const {startX, endX, startY, endY} = object
    const {x, y} = coordinates
    let timeTaken

    let found = (x >= startX && x <= endX && y >= startY && y <= endY)
    if (found) {
        await setObjectFound(id, objectId)
        updatedObjects = await getPlayerObjects(id)
        const allObjectsFound = updatedObjects.every(obj => obj.found == true)
        if (allObjectsFound) {
            let currentTime = Math.floor(Date.now() / 1000) // Date.now() gives time in milliseconds
            timeTaken = currentTime - iat
            const currentTimeTaken = await getTimeTakenByPlayer(id)
            if(typeof currentTimeTaken != "number") {
                await setTimeTaken(id, timeTaken)
            }
        }
    } else {
        updatedObjects = await getPlayerObjects(id)
    }
    res.json({
        found,
        updatedObjects,
        timeTaken
    })
}

module.exports = {
    newGameController,
    verifyGuessController
}
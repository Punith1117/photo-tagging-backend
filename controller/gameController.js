const jwt = require('jsonwebtoken')
const { getPlayerObjects, setObjectsNotFound } = require('../prisma/queries')

const newGameController = async (req, res) => {
    const { id, playerName } = req.user
    const token = jwt.sign({
        id,
        playerName
    }, process.env.GAME_JWT_SECRET, {expiresIn: 200})

    await setObjectsNotFound(id)
    const initialObjects = await getPlayerObjects(id)

    res.json({
        token,
        initialObjects
    })
}

module.exports = {
    newGameController
}
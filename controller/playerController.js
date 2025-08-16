const { generateUsername } = require("unique-username-generator");
const { playerExists, createPlayer } = require("../prisma/queries");
const jwt = require('jsonwebtoken');

const createNewPlayerController = async (req, res) => {
    let newPlayerName
    do {
        newPlayerName = generateUsername('-', 3)
    } while(await playerExists(newPlayerName))

    const player = await createPlayer(newPlayerName)
    const token = jwt.sign({
        id: player.id, playerName: player.name
    }, process.env.JWT_SECRET)

    res.json({
        token
    })
}

module.exports = {
    createNewPlayerController
}
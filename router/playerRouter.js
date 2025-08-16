const { Router } = require("express");
const { createNewPlayerController } = require("../controller/playerController");

const playerRouter = Router()

playerRouter.post('/new', createNewPlayerController)

module.exports = playerRouter
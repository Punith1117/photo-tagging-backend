const { Router } = require("express");
const { createNewPlayerController, getTimeTakenController } = require("../controller/playerController");
const passport = require("passport");

const playerRouter = Router()

playerRouter.post('/new', createNewPlayerController)
playerRouter.get('/time-taken', passport.authenticate('jwt', {session: false}), getTimeTakenController)

module.exports = playerRouter
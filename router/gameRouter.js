const { Router } = require("express");
const passport = require("passport");
const { newGameController } = require("../controller/gameController");

const gameRouter = Router()

gameRouter.post('/new', passport.authenticate('player-jwt', { session: false }), newGameController)

module.exports = gameRouter
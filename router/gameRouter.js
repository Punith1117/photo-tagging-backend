const { Router } = require("express");
const passport = require("passport");
const { newGameController, verifyGuessController } = require("../controller/gameController");

const gameRouter = Router()

gameRouter.post('/new', passport.authenticate('player-jwt', { session: false }), newGameController)
gameRouter.post('/verify-guess', passport.authenticate('game-jwt', {session: false}), verifyGuessController)

module.exports = gameRouter
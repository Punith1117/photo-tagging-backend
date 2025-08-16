const { Router } = require('express')
const getLeaderboardController = require("../controller/leaderboardController")

const leaderboardRouter = Router()

leaderboardRouter.get('/', getLeaderboardController)

module.exports = leaderboardRouter
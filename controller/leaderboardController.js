const { getLeaderboard } = require("../prisma/queries")

const getLeaderboardController = async (req, res) => {
    const leaderboard = await getLeaderboard()
    res.json({
        leaderboard
    })
}

module.exports = getLeaderboardController
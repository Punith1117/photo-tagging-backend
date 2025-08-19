const express = require("express");
const cors = require('cors');
const playerRouter = require("./router/playerRouter");
const leaderboardRouter = require("./router/leaderboardRouter");
const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
const passport = require('./config/passport');
const gameRouter = require("./router/gameRouter");
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(passport.initialize())

require('dotenv').config();


app.use('/player', playerRouter)
app.use('/leaderboard', leaderboardRouter)
app.use('/game', gameRouter)

app.get("/health", (req, res) => res.status(200).json({status: 'ok'}));

app.listen(process.env.PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${process.env.PORT}!`);
});

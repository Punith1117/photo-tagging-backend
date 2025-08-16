const express = require("express");
const cors = require('cors');
const playerRouter = require("./router/playerRouter");
const app = express();

require('dotenv').config();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use('/player', playerRouter)

app.get("/health", (req, res) => res.status(200).json({status: 'ok'}));

app.listen(process.env.PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${process.env.PORT}!`);
});

const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { playerExists } = require('../prisma/queries');

const permanentOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PLAYER_JWT_SECRET,
    ignoreExpiration: true,
};

passport.use("player-jwt", new JwtStrategy(permanentOpts, async (jwt_payload, done) => {
  if (await playerExists(jwt_payload.playerName)) {
    return done(null, jwt_payload);
  }
  return done(null, false);
}));

const expiringOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.GAME_JWT_SECRET,
  ignoreExpiration: false,
};

passport.use("game-jwt", new JwtStrategy(expiringOpts, async (jwt_payload, done) => {
  if (await playerExists(jwt_payload.playerName)) {
    return done(null, jwt_payload);
  }
  return done(null, false);
}));

module.exports = passport;
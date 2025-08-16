const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}
const { playerExists } = require('../prisma/queries');

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    if (await playerExists(jwt_payload.playerName)) {
        return done(null, jwt_payload)
    }
    return done(null, false)
}))

module.exports = passport
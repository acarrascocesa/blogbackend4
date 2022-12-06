const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const {findUserById} = require('../users/users.controllers')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: 'ac4deml0v3rs'
}

passport.use(
    new JwtStrategy(options, async (tokenDecoded, done) => {
        try {
            const user = findUserById(tokenDecoded.id)
            if (user) {
                return done(null, tokenDecoded)
            } else {
                return done(null, false)
            }
        } catch (error) {
            return done(error, false)
        }
    })
)

module.exports = passport
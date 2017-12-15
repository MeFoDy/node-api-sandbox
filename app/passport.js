const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('./entities/user/model').model;
const dbConfig = require('../config/db');

function auth(passport) {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: dbConfig.secret,
    };
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findOne({ id: jwt_payload.sub }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            done(null, false);
        });
    }));
}

module.exports = auth;

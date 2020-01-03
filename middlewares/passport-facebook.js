const passport = require("passport");
const passportfb = require("passport-facebook").Strategy;
const userDB = require('../models/user');
module.exports = function(app) {

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new passportfb(
        {
            clientID: '2661104477262541',
            clientSecret: 'dc31b0531ca34df46940f5c1213bb9c2',
            callbackURL: 'http://localhost:3000/auth/fb/cb',
            profileFields: ['email','gender','locale','displayName']
        },
        (accessToken, refreshToken, profile, done) => {
            console.log(profile);

            userDB.find(profile._json.id).then(user => {
                if(user){
                    return done(null,user);
                }
                else{
                    var entity = {
                        CliId: profile._json.id,
                        CliName: profile._json.name,
                        CliEmail: profile._json.email
                    }

                    userDB.add(entity).then(id => {
                        return done(null,id);
                    })
                }
            }).catch(err => {
                return done(err);
            })
        }
    ))

    passport.serializeUser((user,done) => {
        done(null,user.id);
    })

    passport.deserializeUser((id,done) => {
        userDB.find(id).then(user => {
            done(null,user);
        })
    })
}
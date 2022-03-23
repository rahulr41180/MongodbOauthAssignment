
var GoogleStrategy = require("passport-google-oauth20").Strategy;

const User1 = require("../models/user.model");

const passport = require("passport");

const {v4 : uuidv4} = require("uuid");

require("dotenv").config();

passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,

    callbackURL : "http://localhost:6600/auth/google/callback"
},

    async function(accessToken, refreshToken, profile, cb)
    {
        console.log('profile:', profile);
        let User = await User1.findOne({email : profile?._json?.email}).lean().exec();
        
        if(!User)
        {
            User = await User1.create({
                email : profile._json.email,
                password : uuidv4(),
                role : profile._json.role
            })
        }
        
        console.log('User5:', User)


        return cb(null, User);
    }
));

module.exports = passport;
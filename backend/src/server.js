// servidor Express.
const cors = require('cors');
const express = require('express');

//módulos
const controller = require('./controller');
const repository = require('./repository/');

// autenticación - passport
//para generar archivo key y cert de https --> openssl req -nodes -new -x509 -keyout server.key -out server.cert
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

// autenticación - jwt
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const SECRET_KEY = "SECRET_KEY";

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY
}

const app = express();
// allow big pictures
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use('/', controller);



async function verify(username, password, done) {
   
    const user = await repository.usersCol.findUser(username);

    if (!user) {
        return done(null, false, { message: 'User not found' });
    }

    if (await repository.usersCol.verifyPassword(user, password)) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'Incorrect password' });
    }
}

passport.use(new BasicStrategy(verify));

passport.use(new JwtStrategy(jwtOpts, async (payload, done) => {
    const user = await repository.usersCol.findUser(payload.username);
    if (user) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'User not found' });
    }
}));

async function initApp() {
    await repository.dbConnect();
    await repository.loadDefaultWords();
    await repository.loadDefaultUsers();
    return app;    
} 

module.exports = initApp;
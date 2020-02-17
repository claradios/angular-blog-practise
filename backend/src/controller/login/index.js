'use strict';

const express = require('express');
const routerLogin = express.Router();

const passport = require('passport');
const jwt = require("jsonwebtoken");
const SECRET_KEY = "SECRET_KEY";


routerLogin.post('/',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        
        const { username, rol, nickname, userImage } = req.user;

        const userData = {
            username,
            rol,
            nickname,
            userImage
        }
        const opts = { expiresIn: 3600 }; 
        const token = jwt.sign({ username }, SECRET_KEY, opts);

        return res.status(200).json({ message: "Auth Passed", token, userData });

    });

module.exports = routerLogin;
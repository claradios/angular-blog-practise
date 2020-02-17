const routes = require('express').Router();

const offensivewords = require('./offensivewords');
const posts = require('./posts');
const comments = require('./comments');
const users = require('./users');
const login = require('./login');
// const login = require('./login');

routes.use('/offensivewords', offensivewords);
routes.use('/posts', posts);
routes.use('/posts/:id/comments',comments);
routes.use('/',users);
routes.use('/login',login);
// routes.use('/login',login);

module.exports = routes;
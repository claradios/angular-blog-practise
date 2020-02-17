// Tiene definidos los métodos de la API REST para Posts. 
// Usa un router configurado en Express.

const express = require('express');
const routerPosts = express.Router();
const repository = require('../../repository');
const passport = require('passport');

routerPosts.post('/',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const post = req.body;
        const user = req.user;
        const { username, nickname, rol } = user;
        const { title, content } = post;
        //Validation rol
        if (rol !== 'admin' && rol !== 'publisher') {
            res.status(400).send('unauthorized');
        } else if (
            typeof username != 'string' ||
            typeof nickname != 'string' ||
            typeof title != 'string' ||
            typeof content != 'string'
        ) {
            res.status(400).send('invalid BODY');
        } else {
            const result = await repository.postsCol.addPost(post, user);
            res.json(result.ops[0]);
        }
    });

routerPosts.get('/', async (req, res) => {
    const allPosts = await repository.postsCol.getAllPosts();
    res.json(allPosts);
});

routerPosts.get('/:postId', async (req, res) => {
    const id = req.params.postId;
    const post = await repository.postsCol.getPostById(id);
    if (!post) {
        res.sendStatus(404);
    } else {
        res.json(post);
    }
});

routerPosts.delete('/:postId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const id = req.params.postId;
        const user = req.user;
        const post = await repository.postsCol.getPostById(id);
        const { rol, username } = user;
        const { author } = post;
        if (rol !== 'admin' && username !== author) {
            res.status(400).send('unauthorized');
        }
        else if (!post) {
            res.status(404).send('not found');
        } else {
            await repository.postsCol.deletePostById(id);
            res.json(post);
        }
    });

routerPosts.put('/:postId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {

        const id = req.params.postId;
        const user = req.user;
        const { rol, username } = user;
        const post = await repository.postsCol.getPostById(id);
        const { author } = post;

        if (
            rol !== 'admin' && username !== author
        ) {
            res.status(401).send('unauthorized');
        }
        else if (!post) {
            res.status(404).send('not found');
        } else {
            const postReq = req.body;
            const { title, content, urlToImage } = postReq;
            //Validation
            if (
                typeof title != 'string' ||
                typeof content != 'string' ||
                typeof urlToImage != 'string'
            ) {
                res.sendStatus(400);
            } else {
                const updatePost = repository.postsCol.updateObject(user, postReq, id);
                await repository.postsCol.modifyPost(updatePost, id);
                res.json(updatePost);
            }
        }
    });

module.exports = routerPosts;


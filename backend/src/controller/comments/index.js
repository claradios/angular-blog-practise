// Tiene definidos los métodos de la API REST para comments
// Usa un router configurado en Express.

const express = require('express');
const routerComments = express.Router({ mergeParams: true });
const repository = require('../../repository');
const validator = require('../../validator/');
const ObjectID = require('mongodb').ObjectID;
const passport = require('passport');


routerComments.post('/',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const user = req.user;
        const { rol, nickname } = user;
        const postId = req.params.id;
        const comment = req.body;
        const { text } = comment;
        comment._id = new ObjectID();
        comment.date = new Date();
        comment.nickname = nickname;

        //Validation rol
        if (rol !== 'admin' && rol !== 'publisher') {
            res.status(400).send('unauthorized');
        }
        //Validation
        else if (typeof text != 'string') {
            res.status(400).send('Invalid BODY');
        } else {
            const wordsToCheck = await repository.offensiveWordsCol.getAllOffensiveWords();
            const validation = await validator(text, wordsToCheck);
            if (validation.length === 0) {
                await repository.postsCol.addComment(comment, postId);
                res.json(comment);
            } else {
                res.status(400).json(validation);
                //res.status(400).send({ error: validation })
            }
        }
    });


routerComments.delete('/:commentId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const postId = req.params.id;
        const commentId = req.params.commentId;
        const { rol, nickname } = req.user;
        const comment = await repository.postsCol.findSpecificComment(commentId);

        if (comment.length === 0) {
            res.status(400).send('Comment not found');
        } else if (
            rol !== 'admin' && nickname !== comment.nickname
        ) {
            res.status(400).send('unauthorized');
        } else {
            await repository.postsCol.deleteCommentById(postId, commentId);
            res.json(comment[0]);
        }
    });


routerComments.put('/:commentId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const commentId = req.params.commentId;
        const postId = req.params.id

        const user = req.user;
        const { rol, nickname } = user;

        //FIND COMMENT TO EDIT
        const searchComment = await repository.postsCol.findSpecificComment(commentId);
        const originalComment = searchComment[0].comments[0];
        const { date } = originalComment;

        if (searchComment.length === 0) {

            res.status(400).send('the comment doesnt match any of the existents');

        } else if (rol !== 'admin' && nickname !== originalComment.nickname) {

            res.status(400).send('unauthorized');

        } else {           
            const commentReq = req.body;
            const { text } = commentReq;
            commentReq.date = date;
            
            //BODY VALIDATION
            if (typeof text != 'string') {
                res.status(400).send('invalid BODY');
            } else {
                //WORDS VALIDATION
                const wordsToCheck = await repository.offensiveWordsCol.getAllOffensiveWords();
                const validation = await validator(text, wordsToCheck);
                if (validation.length !== 0) {
                    res.status(400).json(validation);
                } else {
                    //UPDATE RESOURCE 
                    const updatedComment = await repository.postsCol.updateCommentObj(commentId, commentReq,nickname);
                    await repository.postsCol.modifyCommentById(postId, commentId, updatedComment);
                    res.json(updatedComment);
                }
            }
        }
    });

module.exports = routerComments;


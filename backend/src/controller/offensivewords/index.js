// Tiene definidos los métodos de la API REST para offensive words. 
// Usa un router configurado en Express.

const express = require('express');
const routerOffensiveWords = express.Router();
const repository = require('../../repository');
const passport = require('passport');

routerOffensiveWords.post('/',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const offensiveWord = req.body;
        const { word, level } = offensiveWord;
        const allWords = await repository.offensiveWordsCol.getAllOffensiveWords();
        const { rol } = req.user;
        //Validation
        if (rol !== 'admin') {
            res.status(400).send('unauthorize');
        } else if (
            typeof word != 'string' ||
            typeof level != 'number' ||
            level < 0 || level >= 5
        ) {
            res.status(400).send('invalid BODY');
        } else if (repository.offensiveWordsCol.isAlreadyIncluded(offensiveWord, allWords)) {
            res.status(400).send('Offensive Word is already included.')
        } else {
           const result = await repository.offensiveWordsCol.addOffensiveWord(offensiveWord);            
            res.json(result);
        }
    });

routerOffensiveWords.get('/',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { rol } = req.user;
        if (rol !== 'admin') {
            res.status(400).send('unauthorize');
        } else {
            const allWords = await repository.offensiveWordsCol.getAllOffensiveWords();
            res.json(allWords);
        }
    });

routerOffensiveWords.get('/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { rol } = req.user;
        const id = req.params.id;
        const offensiveWord = await repository.offensiveWordsCol.getOffensiveWordById(id);
        if (rol !== 'admin') {
            res.status(400).send('unauthorize');
        } else if (!offensiveWord) {
            res.status(404).send('Word not found');
        } else {
            res.json(offensiveWord);
        }
    });

routerOffensiveWords.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { rol } = req.user;
        const id = req.params.id;
        const offensiveWord = await repository.offensiveWordsCol.getOffensiveWordById(id);
        if (rol !== 'admin') {
            res.status(400).send('unauthorize');
        } else if (!offensiveWord) {
            res.status(404).send('Word not found');
        } else {
            await repository.offensiveWordsCol.deleteOffensiveWordById(id);
            res.json(offensiveWord);
        }
    });

routerOffensiveWords.put('/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { rol } = req.user;
        const id = req.params.id;
        const offensiveWord = await repository.offensiveWordsCol.getOffensiveWordById(id);
        if (rol !== 'admin') {
            res.status(400).send('unauthorize');
        } else if (!offensiveWord) {
            res.status(404).send('Word not found.');
        } else {
            const offensiveWordReq = req.body;  
            if (
                typeof offensiveWordReq.word != 'string' ||
                typeof offensiveWordReq.level != 'number'
            ) {
                res.status(400).send('invalid BODY');
            } else {              
                await repository.offensiveWordsCol.modifyOffensiveWordById(id, offensiveWordReq);                     
                res.json(offensiveWordReq);
            }
        }
    });

module.exports = routerOffensiveWords;

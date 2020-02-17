//Módulo que contendrá el código de acceso a la base de datos.
const MongoClient = require('mongodb').MongoClient;

const Posts = require('./Posts');
const OffensiveWords = require('./OffensiveWords');
const Users = require('./Users.js');
const url = "mongodb://localhost:27017/postsDB";
//default
const defaultUserAdmins = require('../utils/loadAdmins.js');
const defOffensiveWords = require('../utils/defOffensiveWords.js');

module.exports = {
    async dbConnect() {
        const conn = await MongoClient.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        //colecciones: 
        this.postsCol = new Posts(conn);
        this.offensiveWordsCol = new OffensiveWords(conn);
        this.usersCol = new Users(conn);
        console.log("Connected to Mongo");
    },

    async loadDefaultWords() {
        const allWords = await this.offensiveWordsCol.getAllOffensiveWords();
        if (allWords.length === 0) {
            await this.offensiveWordsCol.insertDefaultWords(defOffensiveWords);
            console.log('Default offensive words list has been inserted.')
        }
    },

    async loadDefaultUsers() {
        const allUsers = await this.usersCol.getAllUsers();
        if (allUsers.length === 0) {
            await this.usersCol.loadAdminUsers(defaultUserAdmins);
            console.log('Default users have been inserted')
        }
    },

    async dbDisconnect() {      
        await this.usersCol.closeIt();
        await this.postsCol.closeIt();
        await this.offensiveWordsCol.closeIt();
        console.log('mongo disconnected');
    }
};



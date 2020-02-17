const ObjectId = require('mongodb').ObjectId;
module.exports = class OffensiveWords {
  constructor(conn) {
    this.conn = conn;
    this.collection = this.conn.db().collection('offensiveWords');
  }

  async addOffensiveWord(offensiveWord) {
    const { word, level } = offensiveWord
    const newOffensiveWord = {
      word: word.toLowerCase(),
      level
    };
   await this.collection.insertOne(newOffensiveWord);
   return await this.collection.findOne({word:newOffensiveWord.word})   
  }

  getAllOffensiveWords() {
    return this.collection.find({}).toArray();
  }

  getOffensiveWordById(id) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  deleteOffensiveWordById(id) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }

  modifyOffensiveWordById(id, offensiveWordReq) {
    const newOffensiveWord = {
      word: offensiveWordReq.word,
      level: offensiveWordReq.level
    };
    return this.collection.updateOne({ _id: new ObjectId(id) }, { $set: newOffensiveWord });
  }

  insertDefaultWords(array) {
    array.forEach(async (item) => {
      const { word, level } = item;
      if (typeof word != 'string' || typeof level != 'number') {
        console.log('there is a problem with the default offensive words list');
      } else {
        this.collection.insertOne(item);
      }
    });
  }

  isAlreadyIncluded(offensiveWord, allWords) {
    const { word } = offensiveWord
    const coincidences = allWords.filter(item => item.word === word);
    if (coincidences.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  closeIt() {
    this.collection.close();
  }

}
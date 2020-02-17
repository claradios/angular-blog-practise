//Validador que verifica que el comentario no contiene ninguna palabra ofensiva.

module.exports = (text = '', wordsToCheck = []) => {
    const wrongWords = [];
    const lowerText = text.toLowerCase();
    wordsToCheck.forEach(offensiveWord => {
        const { word } = offensiveWord;
        const wordFound = new RegExp("\\b" + `${word}` + "\\b").test(lowerText);
        const wordIsNotIncluded = !wrongWords.includes(offensiveWord);

        if ( wordFound && wordIsNotIncluded) {            
             wrongWords.push(offensiveWord);
        }
    });

    return wrongWords;
}

const validator = require('../validator');

describe('comment validation ', () => {
    test('it returns [] if no parameters', () => {             
        const output = [];
        const result = validator();

        expect(result).toEqual(output);
    });
    
    test('it returns [] if not forbidden words', () => {
        const text = 'Hola a todos, quería saludar desde Madrid.';
        const wordsToCheck = [{ word: "cerdo", level: 2 }, { word: "zorra", level: 4 }];
        const output = [];
        const result = validator(text, wordsToCheck);

        expect(result).toEqual(output);
    });

    test('it returns [{word:"cerdo",level:2}] if " cerdo," ', () => {
        const text = 'Tío eres un cerdo, deja de escribir estas chorradas';
        const wordsToCheck = [{ word: "cerdo", level: 2 }, { word: "zorra", level: 4 }];
        const output = [{ word: "cerdo", level: 2 }];
        const result = validator(text, wordsToCheck);

        expect(result).toEqual(output);
    });

    test('it returns [{ word: "cerdo", level: 2 }, { word: "zorra", level: 4 }] if " cerdo," && " zorra." ', () => {
        const text = 'Tío eres un cerdo, y tu colega una zorra.';
        const wordsToCheck = [{ word: "cerdo", level: 2 }, { word: "zorra", level: 4 }];
        const output = [{ word: "cerdo", level: 2 }, { word: "zorra", level: 4 }];
        const result = validator(text, wordsToCheck);

        expect(result).toEqual(output);
    });

    test('it returns [{word:"cerdo",level:2}] if "Cerdo," ', () => {
        const text = 'Tío eres un Cerdo, deja de escribir estas chorradas';
        const wordsToCheck = [{ word: "cerdo", level: 2 }, { word: "zorra", level: 4 }];
        const output = [{ word: "cerdo", level: 2 }];
        const result = validator(text, wordsToCheck);

        expect(result).toEqual(output);
    });

    test('it returns [{word:"cerdo",level:2}] if "CERDO," ', () => {
        const text = 'Tío eres un pedazo de CERDO, deja de escribir estas chorradas';
        const wordsToCheck = [{ word: "cerdo", level: 2 }, { word: "zorra", level: 4 }];
        const output = [{ word: "cerdo", level: 2 }];
        const result = validator(text, wordsToCheck);

        expect(result).toEqual(output);
    });

    test('it returns [{word:"cerdo",level:2}] if "Cerdo " ', () => {
        const text = 'Tío eres un cerdo, deja de escribir estas chorradas';
        const wordsToCheck = [{ word: "cerdo", level: 2 }, { word: "zorra", level: 4 }];
        const output = [{ word: "cerdo", level: 2 }];
        const result = validator(text, wordsToCheck);

        expect(result).toEqual(output);
    });

    test('it returns [{word:"cerdo",level:2}] if "CeRdO " ', () => {
        const text = 'Tío eres un CeRdO, deja de escribir estas chorradas';
        const wordsToCheck = [{ word: "cerdo", level: 2 }, { word: "zorra", level: 4 }];
        const output = [{ word: "cerdo", level: 2 }];
        const result = validator(text, wordsToCheck);

        expect(result).toEqual(output);
    });
    
    test('it returns [{word:"cerdo",level:2}] if "CeRdO?" ', () => {
        const text = 'Qué te crees CeRdO?';
        const wordsToCheck = [{ word: "cerdo", level: 2 }, { word: "zorra", level: 4 }];
        const output = [{ word: "cerdo", level: 2 }];
        const result = validator(text, wordsToCheck);

        expect(result).toEqual(output);
    });

    test('it returns [{word:"cerdo",level:2}] if "CeRdO!" ', () => {
        const text = 'Maldito CeRdO!!!';
        const wordsToCheck = [{ word: "cerdo", level: 2 }, { word: "zorra", level: 4 }];
        const output = [{ word: "cerdo", level: 2 }];
        const result = validator(text, wordsToCheck);

        expect(result).toEqual(output);
    });

    test('it returns [{word:"cerdo",level:2}] if "Cerdo" starts sentence ', () => {
        const text = 'CeRdO!!!';
        const wordsToCheck = [{ word: "cerdo", level: 2 }, { word: "zorra", level: 4 }];
        const output = [{ word: "cerdo", level: 2 }];
        const result = validator(text, wordsToCheck);

        expect(result).toEqual(output);
    });

    test('it returns [] if "disPUTA",', () => {
        const text = 'Hubo una fuerte disPUTA ';
        const wordsToCheck = [{ word: "puta", level: 2 }, { word: "zorra", level: 4 }];
        const output = [];
        const result = validator(text, wordsToCheck);

        expect(result).toEqual(output);
    });

    test('it returns [] if "imputado",', () => {
        const text = 'Los políticos han de ser imputados';
        const wordsToCheck = [{ word: "puta", level: 2 }, { word: "zorra", level: 4 }];
        const output = [];
        const result = validator(text, wordsToCheck);

        expect(result).toEqual(output);
    });

    test('it returns [] if "imPUTAdos",', () => {
        const text = 'Los políticos han de ser imPUTAdos';
        const wordsToCheck = [{ word: "puta", level: 2 }, { word: "zorra", level: 4 }];
        const output = [];
        const result = validator(text, wordsToCheck);

        expect(result).toEqual(output);
    });

});


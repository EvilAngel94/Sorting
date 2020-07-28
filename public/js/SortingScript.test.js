const SortingScript = require('./SortingScript.js');

test('html is valid htmlKeyword', () => {
    let result = SortingScript.checkIfSearchedWordIsACssKeyWord('html');
    expect(result).toBe(true);
});

test('Invalid htmlKeyword', () => {
    let result = SortingScript.checkIfSearchedWordIsACssKeyWord('NotKnown');
    expect(result).toBe(false);
})
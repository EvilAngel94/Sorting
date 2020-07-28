const Presenter = require('./Presenter.js');

test('html is valid htmlKeyword', () => {
    let result = Presenter.checkIfSearchedWordIsACssKeyWord('html');
    expect(result).toBe(true);
});

test('Invalid htmlKeyword', () => {
    let result = Presenter.checkIfSearchedWordIsACssKeyWord('NotKnown');
    expect(result).toBe(false);
})
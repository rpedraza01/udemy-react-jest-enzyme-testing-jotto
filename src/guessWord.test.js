import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import App from './App';
import { findByTestAttr, storeFactory } from '../test/testUtils';

import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

import Congrats from './Congrats';
import Input from './input';
import GuessedWords from './GuessedWords';

// activate global mock to make sure getSecretWord doesn't make network call
jest.mock('./actions');

/**
 * Create a wrapper with specified initial conditions,
 * then submit a guessed word of 'train'
 * @function
 * @param {object} state - Initial conditions
 * @returns {Wrapper} - Enzyme wrapper of mounted App component
 */
const setup = ({ secretWord, guessedWords, success }) => {

    const wrapper = mount(
        <guessedWordsContext.GuessedWordsProvider>
            <successContext.SuccessProvider>
                <Congrats />
                <Input secretWord={secretWord} />
                <GuessedWords />
            </successContext.SuccessProvider>
        </guessedWordsContext.GuessedWordsProvider>
    );
    // TODO: apply state
    // const store = storeFactory(initialState);
    // const wrapper = mount(<Provider store={store}><App /></Provider>);

    // add value to input box
    const inputBox = findByTestAttr(wrapper, 'input-box');
    inputBox.simulate('change', { target: { value: 'train' } });

    // simulate click on submit button
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault() {} });

    guessedWords.map(guess => {
        const mockEvent = { target: { value: guess.guessedWord } };
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click', { preventDefault() {} });
    });

    return wrapper;
}

describe('invalid word guessed', () => {
    test.todo('guessedWords table does not get another row')
});

describe('no words guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({
            secretWord: 'party',
            success: false,
            guessedWords: []
        });
    });
    test('creates GuessedWords table with one row', () => {
        const guessedWordRows = findByTestAttr(wrapper, 'guessed-word')
        expect(guessedWordRows).toHaveLength(1);
    });
});

describe('some words guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({
            secretWord: 'party',
            success: false,
            guessedWords: [{ guessedWord: 'agile', letterMatchCount: 1 }],
        });
    });
    test('adds row to guessedWords table', () => {
        const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordNodes).toHaveLength(2);
    });
});

describe('guess secret word', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({
            secretWord: 'party',
            success: false,
            guessedWords: [{ guessedWord: 'agile', letterMatchCount:1 }],
        });

        const inputBox = findByTestAttr(wrapper, 'input-box');
        const mockEvent = { target: { value: 'party' } };
        inputBox.simulate('change', mockEvent);

        const submitButton = findByTestAttr(wrapper, 'submit-button');
        submitButton.simulate('click', { preventDefault() {} });
    });
    test('adds row to guessedWords table', () => {
        const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordNodes).toHaveLength(3);
    });
    test('displays congrats component', () => {
        const congrats = findByTestAttr(wrapper, 'component-congrats');
        expect(congrats.length).toBeGreaterThan(0);
        // expect(congrats.test().length).toBeGreaterThan(0);
    });
    test('does not display input component contents', () => {
        const inputBox = findByTestAttr(wrapper, "input-box");
        expect(inputBox.exists()).toBe(false);

        const submitButton = findByTestAttr(wrapper, 'submit-button');
        expect(submitButton.exists()).toBe(false);
    });
});

// mock entire module for destructuring useState on import
// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import guessedWordsContext from './contexts/guessedWordsContext';
import successContext from './contexts/successContext';
import { guessWord } from './actions';
import languageContext from './contexts/languageContext';
import stringsModule from './helpers/strings';
import { getLetterMatchCount } from './helpers';

function Input({ secretWord }) {
    const language = React.useContext(languageContext);
    const [success, setSuccess] = successContext.useSuccess();
    const [guessedWords, setGuessedWords] = guessedWordsContext.useGuessedWords();
    const [currentGuess, setCurrentGuess] = React.useState("");

    if (success) {
        return <div data-test='component-input' />
    }

    return (
        <div data-test="component-input">
            <form className="form-inline">
                <input 
                    data-test="input-box"
                    className="mb-2 mx-sm-3"
                    type="text"
                    placeholder={stringsModule.getStringByLanguage(language, 'guessInputPlaceholder')}
                    value={currentGuess}
                    onChange={(event) => setCurrentGuess(event.target.value)}
                />
                <button
                    data-test="submit-button"
                    onClick={(evt) => {
                        evt.preventDefault();
                        // update guessedWords
                        const letterMatchCount = getLetterMatchCount(currentGuess, secretWord);
                        const newGuessedWords = [
                            ...guessedWords,
                            { guessedWords: currentGuess, letterMatchCount }
                        ]
                        setGuessedWords(newGuessedWords);
                        // check against secretWord and update success if necessary
                        if (currentGuess === secretWord) setSuccess(true);

                        // clear input box
                        setCurrentGuess("");
                    }}
                    className="btn btn-primary mb-2"
                    >
                    {stringsModule.getStringByLanguage(language, 'submit')}
                </button>
            </form>
        </div>
    );
}

Input.propTypes = {
    secretWord: PropTypes.string.isRequired,
}

export default Input;
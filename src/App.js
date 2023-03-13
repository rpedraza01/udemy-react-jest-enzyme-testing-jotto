import React, { useEffect, useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import LanguagePicker from './LanguagePicker'
import Input from './input';

import { getSecretWord } from './actions';
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import guessedWordsContext from './contexts/guessedWordsContext';

/**
 * @function reducer to update state, automatically called by dispatch
 * @param state {object} - previous state
 * @param action {object} - 'type' and 'payload' properties
 * @return {object} - new state
 */
const reducer = (state, action) => {
  switch(action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload }
    case 'setSecretWord':
      return { ... state, language: action.payload }
    default:
      throw new Error(`Invalid action type: ${action.type}`)
  }
}

function App() {
  // const [secretWord, setSecretWord] = useState('');

  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: null, language: 'en' }
  )

  const success = useSelector(state => state.success);
  const guessedWords = useSelector(state => state.guessedWords);
  const setSecretWord = (secretWord) => {
    dispatch({ type:'setSecretWord', payload: secretWord })
  }
  const setLanguage = (language) => {
    dispatch({ type: 'setLanguage', payload: language});
  }
  // const secretWord = useSelector(state => state.secretWord);

  // const dispatch = useDispatch();

  useEffect(() => {
    getSecretWord(setSecretWord);
    // dispatch(getSecretWord());
  }, [])

  if(state.secretWord === null) {
    return (
      <div className="container" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word...</p>
      </div>
    )
  }

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <p>The secret word is {state.secretWord}</p>
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <guessedWordsContext.GuessedWordsProvider>
          <successContext.SuccessProvider>
            <Congrats />
            <Input secretWord={state.secretWord} />
          </successContext.SuccessProvider>
          <GuessedWords />
        </guessedWordsContext.GuessedWordsProvider>
      </languageContext.Provider>
    </div>
  );
}

export default App;

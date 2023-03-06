import React from 'react';

const guessedWordsContext = React.createContext();

/**
 * @function useGuessedWords
 * @returns {array} guessedWordsContext value, which is a state of [value, setter]
 * 
 */
export function useGuessedWords() {
    // useContext is a hook that returns the context value
    // In this case, the context value is an [value, setter] array for the context state
    // useContext also subscribes to changes, and will update any time the context value updates
    //      we've memoized this so that it will only update when the guessedWords value updates
    const context = React.useContext(guessedWordsContext)

    // throw an error if the context doesn't exist -- means we aren't in a provider
    if (!context) {
        throw new Error('useGuessedWords must be used within a GuessedWordsProvider')
    }

    // otherwise return the context
    return context
}

/**
 * @function GuessedWordsProvider
 * @param {object} props - props to pass through from declared component
 * @returns {JSX.Element} Provider component
 */
export function GuessedWordsProvider(props) {
    // create state that will be used within the provider
    // initial state value is false
    const [guessedWords, setGuessedWords] = React.useState([])

    // value for the context provider will be array of [value, setter] for guessedWords string
    // useMemo just ensure that the provider value will only update when guessedWords updates
    // No need to test this -- React test useMemo for us!
    const value = React.useMemo(() => [guessedWords, setGuessedWords], [guessedWords])

    // Return a Provider component with the [value, setter] array as the value, passing the
    return <guessedWordsContext.Provider value={value} {...props} />
}

export default { GuessedWordsProvider, useGuessedWords }

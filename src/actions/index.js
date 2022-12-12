import axios from 'axios';

export const actionTypes = {
    CORRECT_GUESS: 'CORRECT_GUESS',
}

/**
 * @function correctGuess
 * @returns {object} - Action object with type `CORRECT_GUESS`
 */
export function correctGuess() {
    return { type: actionTypes.CORRECT_GUESS };
}

export const getSecretWord = () => {
    // TODO: write actial action in Redux / context sections
    return axios.get('http://localhost:3030')
        .then(response => response.data);
}
// mock entire module for destructuring useState on import
// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function Input({ secretWord }) {
    const [currentGuess, setCurrentGuess] = React.useState("");
    const success = useSelector(state => state.success);

    if (success) {
        return <div data-test='component-input'/>
    }

    return (
        <div data-test="component-input">
            <form className="form-inline">
                <input 
                    data-test="input-box"
                    className="mb-2 mx-sm-3"
                    type="text"
                    placeholder="enter guess"
                    value={currentGuess}
                    onChange={(event) => setCurrentGuess(event.target.value)}
                />
                <button
                    data-test="submit-button"
                    onClick={(evt) => {
                        evt.preventDefault();
                        // TODO: update guessedWords
                        // TODO: check against secretWord and update success if needed
                        setCurrentGuess("");
                    }}
                    className="btn btn-primary mb-2"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

Input.propTypes = {
    secretWord: PropTypes.string.isRequired,
}

export default Input;
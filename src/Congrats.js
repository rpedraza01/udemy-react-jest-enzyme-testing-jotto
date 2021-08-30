import React from 'react';

// receive the success state as a prop
/**
* @function
* @param {object} props - React props.
* @returns {JSX.Element} - Rendered component (or null if 'success' prop is false)
*/
export default (props) => {
    if (props.success) {
        return (
        <div data-test="component-congrats">
            <span data-test="congrats-message">
                Congratulation! You guessed the word!
            </span>
        </div>
        );
    } else {
        return (
            <div data-test="component-congrats" />
        );
    }
}
import React from 'react';

import languageContext from './contexts/languageContext';
import stringsModule from './helpers/strings';
import successContext from './contexts/successContext';

// receive the success state as a prop
/**
* @function
* @returns {JSX.Element} - Rendered component (or null if 'success' prop is false)
*/
const Congrats = () => {
    const [success] = successContext.useSuccess();
    const language = React.useContext(languageContext);

    if (success) {
        return (
        <div data-test="component-congrats" className="alert alert-success">
            <span data-test="congrats-message">
                {stringsModule.getStringByLanguage(language, 'congrats')}
            </span>
        </div>
        );
    } else {
        return (
            <div data-test="component-congrats" />
        );
    }
};

export default Congrats;

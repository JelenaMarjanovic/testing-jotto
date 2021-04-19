import React from 'react';
import PropTypes from 'prop-types';

const SecretWordReveal = (props) => {
  const { display, secretWord } = props;

  if (display) {
    return (
      <div
        data-test="component-secret-word-reveal"
        className="alert alert-danger"
      >
        <span data-test="reveal-message">
          The secret word was "{secretWord}"
          <br />
          Better luck next time!
        </span>
      </div>
    );
  } else {
    return <div data-test="component-secret-word-reveal" />;
  }
};

SecretWordReveal.propTypes = {
  display: PropTypes.bool.isRequired,
  secretWord: PropTypes.string
};

export default SecretWordReveal;

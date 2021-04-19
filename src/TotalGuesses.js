import React from 'react';
import PropTypes from 'prop-types';

const TotalGuesses = (props) => {
  const { guessCount } = props;

  return (
    <h4 data-test="component-total-guesses" className="spacer-bottom">
      Total Guesses: {guessCount}
    </h4>
  );
};

TotalGuesses.propTypes = {
  guessCount: PropTypes.number.isRequired
};

export default TotalGuesses;

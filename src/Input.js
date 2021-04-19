import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { guessWord, giveUp } from './actions';

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState('');
  const dispatch = useDispatch();
  const success = useSelector((state) => state.success);

  if (success) {
    return <div data-test="component-input" />;
  }

  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder="Enter guess"
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={(event) => {
            event.preventDefault();
            dispatch(guessWord(currentGuess));
            setCurrentGuess('');
          }}
        >
          Submit
        </button>
        <button
          data-test="give-up-button"
          className="btn btn-danger mb-2"
          onClick={() => {
            dispatch(giveUp());
          }}
        >
          Give Up
        </button>
      </form>
    </div>
  );
};

Input.propTypes = {
  secretWord: PropTypes.string.isRequired
};

export default Input;

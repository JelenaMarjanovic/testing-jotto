import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

const EnterWordForm = ({ formAction }) => {
  const [secretWord, setSecretWord] = useState('');
  const dispatch = useDispatch();

  const submitForm = (event) => {
    event.preventDefault();
    // Don't submit an empty word
    if (secretWord.length > 0) {
      dispatch(formAction(secretWord));
    }
  };

  return (
    <div data-test="component-enter-word-form">
      <p data-test="enter-word-instructions">
        Enter a secret word for someone else to guess!
      </p>
      <form className="form-inline spacer-bottom">
        <input
          data-test="enter-word-input"
          className="mb-2 mx-sm-3"
          type="text"
          value={secretWord}
          placeholder="Enter secret word"
          onChange={(event) => setSecretWord(event.target.value)}
        />
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          type="submit"
          onClick={submitForm}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

EnterWordForm.propTypes = {
  formAction: PropTypes.func
};

export default EnterWordForm;

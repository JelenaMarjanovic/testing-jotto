import { actionTypes } from '../actions';

/**
 * @function guessedWordsReducer
 * @param {array} state - Array of guessed words.
 * @param {object} action - Action to be reduced.
 * @returns {array} - New guessedWords state.
 */
const guessedWords = (state = [], action) => {
  switch (action.type) {
    case actionTypes.GUESS_WORD:
      return [...state, action.payload];
    case actionTypes.RESET_GAME:
      return [];
    default:
      return state;
  }
};

export default guessedWords;

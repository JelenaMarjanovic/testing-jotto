import { actionTypes } from '../actions';

/**
 * @function successReducer
 * @param {array} state - Array of guessed words.
 * @param {object} action - Action to be reduced.
 * @returns {boolean} - New success state.
 */
const successReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypes.CORRECT_GUESS:
      return true;
    default:
      return state;
  }
};

export default successReducer;

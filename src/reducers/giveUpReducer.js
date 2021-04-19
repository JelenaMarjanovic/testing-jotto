import { actionTypes } from '../actions';

/**
 * @function giveUp
 * @param {boolean} state - Whether the user has given up.
 * @param {object} action - Action to be reduced.
 * @returns {boolean} - giveUp state.
 */
const giveUpReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypes.GIVE_UP:
      return true;
    case actionTypes.RESET_GAME:
      return false;
    default:
      return state;
  }
};

export default giveUpReducer;

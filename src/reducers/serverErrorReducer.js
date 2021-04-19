import { actionTypes } from '../actions';

/**
 * @function serverErrorReducer
 * @param {boolean} state - State before reducer.
 * @param {object} action - Action sent to reducer.
 * @returns {boolean} - New state (depending on action type).
 */
const serverErrorReducer = (state = false, action) => {
  switch (action.type) {
    case actionTypes.SERVER_ERROR:
      return true;
    default:
      return false;
  }
};

export default serverErrorReducer;

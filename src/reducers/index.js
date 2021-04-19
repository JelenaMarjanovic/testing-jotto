import { combineReducers } from 'redux';

import success from './successReducer';
import guessedWords from './guessedWordsReducer';
import secretWord from './secretWordReducer';
import giveUp from './giveUpReducer';
import userEnter from './userEnterReducer';
import serverError from './serverErrorReducer';

export default combineReducers({
  success,
  guessedWords,
  secretWord,
  giveUp,
  userEnter,
  serverError
});

import axios from 'axios';

import { getLetterMatchCount } from '../helpers';

export const actionTypes = {
  CORRECT_GUESS: 'CORRECT_GUESS',
  GUESS_WORD: 'GUESS_WORD',
  SET_SECRET_WORD: 'SET_SECRET_WORD',
  RESET_GAME: 'RESET_GAME',
  GIVE_UP: 'GIVE_UP',
  USER_ENTERING: 'USER_ENTERING',
  USER_ENTERED: 'USER_ENTERED'
};

/**
 * Returns Redux Thunk function that dispatches GUESS_WORD action
 * and (conditionally) CORRECT_GUESS action.
 * @function guessWord
 * @param {string} guessedWord - Guessed word.
 * @returns {function} - Redux Thunk function.
 */
export const guessWord = (guessedWord) => {
  return function (dispatch, getState) {
    const { secretWord } = getState();
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({
      type: actionTypes.GUESS_WORD,
      payload: { guessedWord, letterMatchCount }
    });

    if (guessedWord === secretWord) {
      dispatch({ type: actionTypes.CORRECT_GUESS });
    }
  };
};

/**
 * Dispatch axios action to get secret word from random word server.
 * Separate this out so it can be used in getSecretWord and resetGame
 * @function getSecretWordDispatch
 * @param {dispatch} dispatch - Redux Thunk dispatch
 */
const getSecretWordDispatch = (dispatch) => {
  return axios.get('http://localhost:3030').then((response) => {
    dispatch({
      type: actionTypes.SET_SECRET_WORD,
      payload: response.data
    });
  });
};

/**
 * Returns Redux Thunk function that initiates an axios request
 * and dispatches the response as a 'SET_SECRET_WORD' action.
 * @function getSecretWord
 * @returns {function} - Redux Thunk function.
 */
export const getSecretWord = () => {
  return getSecretWordDispatch;
};

/**
 * Action creator to reset game and get a new secret word.
 * @function resetGame
 * @returns {function} - Redux Thunk function that dispatches RESET_GAME action and calls getSecretWord()
 */
export const resetGame = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.RESET_GAME });
    return getSecretWordDispatch(dispatch);
  };
};

/**
 * Simple action creator that returns GIVE_UP action type.
 * @function giveUp
 * @returns {object} - GIVE_UP action type.
 */
export const giveUp = () => ({ type: actionTypes.GIVE_UP });

/**
 * Action creator that returns USER_ENTERING action type.
 * @function setUserEntering
 * @returns {object} - USER_ENTERING action type.
 */
export const setUserEntering = () => ({ type: actionTypes.USER_ENTERING });

/**
 * Action creator to dispatch USER_ENTERED and SET_SECRET_WORD actions.
 * @function seUserSecretWord
 * @param {string} userSecretWord - Secret word entered by user.
 * @returns {function} - Redux Thunk function.
 */
export const setUserSecretWord = (userSecretWord) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SET_SECRET_WORD, payload: userSecretWord });
    dispatch({ type: actionTypes.USER_ENTERED });
  };
};

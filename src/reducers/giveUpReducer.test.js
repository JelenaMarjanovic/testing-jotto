import { actionTypes } from '../actions';

import giveUpReducer from './giveUpReducer';

test('returns default initial state of "false" when no action is passed', () => {
  const newState = giveUpReducer(undefined, {});
  expect(newState).toBe(false);
});

test('returns state of "true" upon receiving an action of type "GIVE_UP"', () => {
  const newState = giveUpReducer(false, { type: actionTypes.GIVE_UP });
  expect(newState).toBe(true);
});

test('returns state of "false" upon receiving an action of type "RESET_GAME"', () => {
  // Start with giveUp true, since giveUp is false by default
  const newState = giveUpReducer(true, { type: actionTypes.RESET_GAME });
  expect(newState).toBe(false);
});

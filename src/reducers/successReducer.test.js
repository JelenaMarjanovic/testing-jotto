import { actionTypes } from '../actions';
import successReducer from './successReducer';

test('when previous state is undefined, returns `false`', () => {
  const newState = successReducer(undefined, {});

  expect(newState).toBe(false);
});

test('returns previous state when unknown action type', () => {
  const newState = successReducer(false, { type: 'unknown' });

  expect(newState).toBe(false);
});

test('returns `true` for action type "CORRECT_GUESS"', () => {
  const newState = successReducer(false, { type: actionTypes.CORRECT_GUESS });

  expect(newState).toBe(true);
});

test('returns state of false upon receiving an action of type "RESET_GAME"', () => {
  // Start with success true, since success is false by default
  const newState = successReducer(true, { type: actionTypes.RESET_GAME });
  expect(newState).toBe(false);
});

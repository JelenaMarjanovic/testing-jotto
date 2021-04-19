import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { findByTestAttr, storeFactory } from '../test/testUtils';

import App from './App';

// Activate global mock to make sure getSecretWork doesn't make network call
jest.mock('./actions');

/**
 * Create wrapper with specified initial conditions,
 * then submit a guessed word of 'train'
 * @function setup
 * @param {object} state - Initial conditions.
 * @returns {Wrapper} - Enzyme wrapper of mounted App component.
 */
const setup = (initialState = {}) => {
  const store = storeFactory(initialState);

  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Add value to input box
  const inputBox = findByTestAttr(wrapper, 'input-box');
  inputBox.simulate('change', { target: { value: 'train' } });

  // Simulate click on submit button
  const submitButton = findByTestAttr(wrapper, 'submit-button');
  submitButton.simulate('click', { preventDefault() {} });

  return wrapper;
};

describe('no words guessed', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: []
    });
  });

  test('creates guessedWords table with one row', () => {
    const guessedWordsRows = findByTestAttr(wrapper, 'guessed-word');

    expect(guessedWordsRows).toHaveLength(1);
  });

  test('show 1 total guess', () => {
    const component = findByTestAttr(wrapper, 'component-total-guesses');

    expect(component.text()).toContain('1');
  });
});

describe('some words guessed', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [
        {
          guessedWord: 'agile',
          letterMatchCount: 1
        }
      ]
    });
  });

  test('add row to guessedWords table', () => {
    const guessedWordsRows = findByTestAttr(wrapper, 'guessed-word');

    expect(guessedWordsRows).toHaveLength(2);
  });

  test('add 1 to total guesses', () => {
    const component = findByTestAttr(wrapper, 'component-total-guesses');

    expect(component.text()).toContain('2');
  });
});

describe('guess secret word', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [
        {
          guessedWord: 'agile',
          letterMatchCount: 1
        }
      ]
    });

    // Add value to input box
    const inputBox = findByTestAttr(wrapper, 'input-box');
    const mockEvent = { target: { value: 'party' } };
    inputBox.simulate('change', mockEvent);

    // Simulate click on submit button
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault() {} });
  });

  test('add row to guessedWords table', () => {
    const guessedWordsRows = findByTestAttr(wrapper, 'guessed-word');

    expect(guessedWordsRows).toHaveLength(3);
  });

  test('add guess to total guesses', () => {
    const component = findByTestAttr(wrapper, 'component-total-guesses');

    expect(component.text()).toContain('3');
  });

  test('displays congrats component', () => {
    const congratsComponent = findByTestAttr(wrapper, 'component-congrats');

    expect(congratsComponent.text().length).toBeGreaterThan(0);
  });

  test('does not display input component contents', () => {
    // Input box
    const inputBox = findByTestAttr(wrapper, 'input-box');
    expect(inputBox.exists()).toBe(false);

    // Submit button
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    expect(submitButton.exists()).toBe(false);
  });
});

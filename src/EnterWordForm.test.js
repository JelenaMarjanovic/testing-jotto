import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';

import EnterWordForm from './EnterWordForm';

const defaultProps = { formAction: () => {} };

/**
 * Factory function to create a ShallowWrapper for the EnterWordForm component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<EnterWordForm {...setupProps} />);
};

describe('render', () => {
  // The condition for this to render is within the App component
  // so, we don't need to test conditional rendering here
  test('renders without errors', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-enter-word-form');

    expect(component.length).toBe(1);
  });

  test('renders instructions', () => {
    const wrapper = setup();
    const instructions = findByTestAttr(wrapper, 'enter-word-instructions');

    expect(instructions.length).toBe(1);
  });

  test('renders input box', () => {
    const wrapper = setup();
    const inputBox = findByTestAttr(wrapper, 'enter-word-input');

    expect(inputBox.length).toBe(1);
  });

  test('renders submit button', () => {
    const wrapper = setup();
    const submitButton = findByTestAttr(wrapper, 'submit-button');

    expect(submitButton.length).toBe(1);
  });

  test('does not throw warning with expected props', () => {
    const expectedProps = { formAction: () => {} };
    checkProps(EnterWordForm, expectedProps);
  });
});

describe('submit click action', () => {
  let setUserSecretWordMock;
  let wrapper;
  const userSecretWord = 'lunch';

  beforeEach(() => {
    // Create a mock function for "setUserSecretWord"
    setUserSecretWordMock = jest.fn();

    // Set up Input, with setUserSecretWordMock as a prop
    wrapper = setup({ formAction: setUserSecretWordMock });

    // Simulate the input
    const mockEvent = { target: { value: userSecretWord } };
    const inputBox = findByTestAttr(wrapper, 'enter-word-input');
    inputBox.simulate('change', mockEvent);

    // Simulate click on submit button
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault() {} });
  });

  test('setUserSecretWord was called once', () => {
    const setUserSecretWordCallCount = setUserSecretWordMock.mock.calls.length;
    expect(setUserSecretWordCallCount).toBe(1);
  });

  test('"setUserSecretWord" was called with input value as argument', () => {
    const userSecretWordArgument = setUserSecretWordMock.mock.calls[0][0];
    expect(userSecretWordArgument).toBe(userSecretWord);
  });
});

import React from 'react';
import { mount } from 'enzyme';

import { findByTestAttr, checkProps, storeFactory } from '../test/testUtils';
import { Provider } from 'react-redux';

import Input from './Input';

const defaultProps = {
  secretWord: 'party'
};

/**
 * Factory function to create a ShallowWrapper for the Input component.
 * @returns {ShallowWrapper}
 */
const setup = (initialState = {}, props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  const store = storeFactory(initialState);

  return mount(
    <Provider store={store}>
      <Input {...setupProps} />
    </Provider>
  );
};

describe('render', () => {
  describe('success is true', () => {
    let wrapper;
    const initialState = { success: true };

    beforeEach(() => {
      wrapper = setup(initialState);
    });

    test('renders without error', () => {
      const inputComponent = findByTestAttr(wrapper, 'component-input');

      expect(inputComponent.length).toBe(1);
    });

    test('input box does not show', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');

      expect(inputBox.exists()).toBe(false);
    });

    test('"submit" button does not show', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');

      expect(submitButton.exists()).toBe(false);
    });

    test('"give up" button does not show', () => {
      const giveUpButton = findByTestAttr(wrapper, 'give-up-button');

      expect(giveUpButton.exists()).toBe(false);
    });
  });

  describe('success is false', () => {
    let wrapper;
    const initialState = { success: false };

    beforeEach(() => {
      wrapper = setup(initialState);
    });

    test('renders without error', () => {
      const inputComponent = findByTestAttr(wrapper, 'component-input');

      expect(inputComponent.length).toBe(1);
    });

    test('renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');

      expect(inputBox.exists()).toBe(true);
    });

    test('renders "submit" button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');

      expect(submitButton.exists()).toBe(true);
    });

    test('renders "give up" button', () => {
      const giveUpButton = findByTestAttr(wrapper, 'give-up-button');

      expect(giveUpButton.exists()).toBe(true);
    });
  });
});

test('does not throw warning with expected props', () => {
  checkProps(Input, defaultProps);
});

describe('state controlled input field', () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  const initialState = { success: false };
  let originalUseState;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    originalUseState = React.useState;
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);

    wrapper = setup(initialState);
  });

  afterEach(() => {
    React.useState = originalUseState;
  });

  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');

    const mockEvent = { target: { value: 'train' } };
    inputBox.simulate('change', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train');
  });

  test('field is cleared upon submit button click', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');

    submitButton.simulate('click', { preventDefault() {} });

    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });
});

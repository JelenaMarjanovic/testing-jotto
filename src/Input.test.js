import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';
import Input from './Input';

const defaultProps = {
  success: false,
  secretWord: 'party'
};

/**
 * Factory function to create a ShallowWrapper for the Input component.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Input {...setupProps} />);
};

describe('render', () => {
  describe('success is true', () => {
    let wrapper;
    const props = { success: true };

    beforeEach(() => {
      wrapper = setup(props);
    });

    test('renders without error', () => {
      const inputComponent = findByTestAttr(wrapper, 'component-input');

      expect(inputComponent.length).toBe(1);
    });

    test('input box does not show', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');

      expect(inputBox.exists()).toBe(false);
    });

    test('submit button does not show', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');

      expect(submitButton.exists()).toBe(false);
    });
  });

  describe('success is false', () => {
    let wrapper;
    const props = { success: false };

    beforeEach(() => {
      wrapper = setup(props);
    });

    test('renders without error', () => {
      const inputComponent = findByTestAttr(wrapper, 'component-input');

      expect(inputComponent.length).toBe(1);
    });

    test('input box does not show', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');

      expect(inputBox.exists()).toBe(true);
    });

    test('submit button does not show', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');

      expect(submitButton.exists()).toBe(true);
    });
  });
});

test('does not throw warning with expected props', () => {
  checkProps(Input, defaultProps);
});

describe('state controlled input field', () => {
  let mockSetCurrentGuess = jest.fn();
  let wrapper;
  let originalUseState;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    originalUseState = React.useState;
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);

    wrapper = setup();
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

import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr, checkProps } from '../test/testUtils';

import SecretWordReveal from './SecretWordReveal';

const secretWord = 'party';
const defaultProps = { display: false, secretWord };

/**
 * Factory function to create a ShallowWrapper for the SecretWordReveal component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<SecretWordReveal {...setupProps} />);
};

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-secret-word-reveal');

  expect(component.length).toBe(1);
});

test('renders no text when "display" prop is false', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-secret-word-reveal');

  expect(component.text()).toBe('');
});

test('does not show reveal message when "display" prop is false', () => {
  const wrapper = setup();
  const revealMessage = findByTestAttr(wrapper, 'reveal-message');

  expect(revealMessage.length).toBe(0);
});

test('renders message containing secret word when "display" prop is true', () => {
  const wrapper = setup({ display: true });
  const component = findByTestAttr(wrapper, 'reveal-message');

  expect(component.text()).toContain(secretWord);
});

test('does not throw warning with expected props', () => {
  const expectedProps = { display: false, secretWord };

  checkProps(SecretWordReveal, expectedProps);
});

import { mount } from 'enzyme';

import { findByTestAttr, storeFactory } from '../test/testUtils';
import { Provider } from 'react-redux';

import App from './App';

import { getSecretWord as mockGetSecretWord } from './actions';

// Activate global mock to make sure getSecretWork doesn't make network call
jest.mock('./actions');

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @returns {ShallowWrapper}
 */
const setup = () => {
  const store = storeFactory();

  // Use mount, because useEffect not called on 'shallow'
  // https://github.com/airbnb/enzyme/issues/2086
  return mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

test('App renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');

  expect(appComponent).toHaveLength(1);
});

describe('get secret word', () => {
  beforeEach(() => {
    // Clear the mock calls from previous tests
    mockGetSecretWord.mockClear();
  });

  test('getSecretWord runs on app mount', () => {
    setup();

    expect(mockGetSecretWord).toHaveBeenCalledTimes(1);
  });

  test('getSecretWord does not run on app update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();

    // Using setProps because wrapper.updates() doesn't trigger useEffect
    // https://github.com/enzymejs/enzyme/issues/2254
    wrapper.setProps();

    expect(mockGetSecretWord).toHaveBeenCalledTimes(0);
  });
});

// Challenge #4: Enter Secret Word
// Note: the logic of what displays according to state
// should be tested here.

import React from 'react';

import PropTypes from 'prop-types';

const EnterWordButton = (props) => {
  const { display, buttonAction } = props;

  if (display) {
    return (
      <button
        data-test="component-enter-word-button"
        className="btn btn-primary spacer-bottom"
        onClick={buttonAction}
      >
        Enter your own secret word
      </button>
    );
  } else {
    return <div data-test="component-enter-word-button" />;
  }
};

EnterWordButton.propTypes = {
  display: PropTypes.bool.isRequired,
  buttonAction: PropTypes.func
};

export default EnterWordButton;

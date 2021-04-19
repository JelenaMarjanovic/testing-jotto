import React from 'react';
import PropTypes from 'prop-types';

const NewWordButton = (props) => {
  const { display, resetAction } = props;

  if (display) {
    return (
      <button
        data-test="component-new-word-button"
        className="btn btn-primary spacer-bottom"
        onClick={resetAction}
      >
        New word
      </button>
    );
  } else {
    return <div data-test="component-new-word-button" />;
  }
};

NewWordButton.propTypes = {
  display: PropTypes.bool.isRequired,
  resetAction: PropTypes.func
};

export default NewWordButton;

import React from 'react';
import { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { PropTypes } from 'prop-types';

function AddRemove({ action, value = false, ansId, ...rest }) {
  const [correct, setCorrect] = useState(value);
  let content;
  if (correct === true) {
    content = <CheckCircleIcon style={{ color: 'green' }} {...rest} />;
  } else {
    content = <CancelIcon style={{ color: 'red' }} {...rest} />;
  }
  const handleClick = () => {
    setCorrect((prevState) => {
      return !prevState;
    });
  };
  useEffect(() => {
    setCorrect(value);
  }, [value]);

  useEffect(() => {
    if (typeof action === 'function') {
      console.log('Executing T/F', ansId, correct);
      action(ansId, correct);
    }
  }, [correct, ansId]);

  return (
    <IconButton edge="start" color="inherit" onClick={handleClick}>
      {content}
    </IconButton>
  );
}

AddRemove.propTypes = {
  action: PropTypes.func,
};

export default AddRemove;

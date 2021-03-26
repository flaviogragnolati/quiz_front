import React from 'react';
import { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { PropTypes } from 'prop-types';

function AddRemove({ action, ...rest }) {
  const [remove, setRemove] = useState(false);
  let content;
  if (remove === true) {
    content = <RemoveCircleOutlineIcon {...rest} />;
  } else {
    content = <AddCircleIcon {...rest} />;
  }

  const handleClick = (state) => {
    setRemove((prevState) => {
      return !prevState;
    });
  };

  useEffect(() => {
    if (typeof action === 'function') {
      action(remove);
    }
  }, [remove, action]);

  return (
    <IconButton
      edge="start"
      color="inherit"
      onClick={() => handleClick(remove)}
    >
      {content}
    </IconButton>
  );
}

AddRemove.propTypes = {
  action: PropTypes.func,
};

export default AddRemove;

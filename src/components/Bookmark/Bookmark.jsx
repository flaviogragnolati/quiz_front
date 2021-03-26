import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import IconButton from '@material-ui/core/IconButton';

function Bookmark({ action, ...rest }) {
  const [checked, setChecked] = useState(null);
  let content;
  if (checked === true) {
    content = <BookmarkIcon {...rest} />;
  } else {
    content = <BookmarkBorderIcon {...rest} />;
  }

  const handleClick = (checked) => {
    if (checked == null) {
      setChecked(true);
    } else {
      setChecked((prevState) => !prevState);
    }
    // if (typeof action === 'function') {
    //   action(checked);
    // }
  };
  useEffect(() => {
    if (checked !== null && typeof action === 'function') {
      action(checked);
    }
  }, [checked, action]);

  return (
    <IconButton
      edge="start"
      color="inherit"
      onClick={() => handleClick(checked)}
    >
      {content}
    </IconButton>
  );
}

Bookmark.propTypes = {
  action: PropTypes.func,
};

export default Bookmark;

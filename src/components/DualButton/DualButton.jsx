import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';

function DualButton({ action, colors, variants, texts, ...props }) {
  const [initial, setInitial] = useState(true);

  const handleClick = () => {
    setInitial((prev) => !prev);
  };

  let content = null;

  if (initial) {
    content = (
      <Button
        onClick={handleClick}
        variant={variants[0]}
        color={colors[0]}
        {...props}
      >
        {texts[0]}
      </Button>
    );
  } else {
    content = (
      <Button
        onClick={handleClick}
        variant={variants[1]}
        color={colors[1]}
        {...props}
      >
        {texts[1]}
      </Button>
    );
  }

  useEffect(() => {
    if (typeof action === 'function') {
      action(initial);
    }
  }, [initial, action]);

  return <>{content}</>;
}

export default DualButton;

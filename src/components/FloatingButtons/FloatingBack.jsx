import React from 'react';
import { Fab } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  position: {
    position: 'fixed',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    zIndex: 1,
  },
}));

function FloatingBack() {
  const c = useStyles();
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };
  useEffect(() => {
    if (history.length < 1) return null;
  }, [history.length]);

  return (
    <div >
      {history.length < 1 ? null : (
        <Fab
          Style="z-index: 3;"
          variant="extended"
          color="primary"
          size="medium"
          aria-label="back button"
          className={c.margin + ' ' + c.position}
          onClick={handleClick}
        >
          <ArrowBackIosIcon className={c.extendedIcon} />
          Back
        </Fab>
      )}
    </div>
  );
}

export default FloatingBack;

import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  school: {
    color: theme.palette.primary.main,
  },
  subject: {
    color: theme.palette.primary.dark,
  },
  quiz: {
    color: theme.palette.primary.light,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

function Filter(props) {
  const c = useStyles();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const menu = (
    <Popper
      open={open}
      anchorEl={anchorRef.current}
      role={undefined}
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom' ? 'center top' : 'center bottom',
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList
                autoFocusItem={open}
                id="menu-list-grow"
                onKeyDown={handleListKeyDown}
              >
                <MenuItem onClick={handleClose}>Ver todas</MenuItem>
                <MenuItem onClick={handleClose}>Filtrar</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <Button color={c.school.color} ref={anchorRef} onClick={handleToggle}>
          Schools
        </Button>
        {menu}
      </Grid>
      <Grid item>
        <Button color={c.subject.color} onClick={handleToggle}>
          Subjects
        </Button>
      </Grid>
      <Grid item>
        <Button color={c.quiz.color} onClick={handleToggle}>
          Quizzes
        </Button>
      </Grid>
    </Grid>
  );
}

export default Filter;

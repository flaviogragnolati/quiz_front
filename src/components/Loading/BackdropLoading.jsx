import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function BackdropLoading({
  action,
  color = 'inherit',
  thickness = 4,
  size = 250,
  ...props
}) {
  const classes = useStyles();


  return (
    <div>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color={color} size={size} thickness={thickness} />
      </Backdrop>
    </div>
  );
}

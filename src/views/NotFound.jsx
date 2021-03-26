import React from 'react';
import styles from 'assets/jss/material-kit-react/views/loginPage.js';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(styles);

const image =
  'https://www.oho.com/sites/default/files/styles/width_1160/public/2020-03/shutterstock_1076235776.jpg?itok=gNVLEOJt';
function NotFound() {
  const classes = useStyles();

  return (
    <div>
      {' '}
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      ></div>
    </div>
  );
}

export default NotFound;

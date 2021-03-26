import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import CardHeader from 'components/Card/CardHeader.js';

const useStyles = makeStyles((theme) => ({
  cardHeader: {
    width: 'auto',
    textAlign: 'center',
    marginLeft: '20px',
    marginRight: '20px',
    marginTop: '-40px',
    padding: '20px 0',
    marginBottom: '15px',
  },
  socialIcons: {
    maxWidth: '24px',
    marginTop: '0',
    width: '100%',
    transform: 'none',
    left: '0',
    top: '0',
    height: '100%',
    lineHeight: '41px',
    fontSize: '20px',
  },
  divider: {
    marginTop: '30px',
    marginBottom: '0px',
    textAlign: 'center',
  },
  socialLine: {
    marginTop: '1rem',
    textAlign: 'center',
    padding: '0',
  },
}));

function LoginHeader() {
  const c = useStyles();
  return (
    <CardHeader color="primary" className={c.cardHeader}>
      <h4>Login</h4>
      <div className={c.socialLine}>
      </div>
    </CardHeader>
  );
}

export default LoginHeader;

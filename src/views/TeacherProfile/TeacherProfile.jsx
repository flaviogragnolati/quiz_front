import React from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import ProfileDetails from '../../components/ProfileDetail';
import Account from 'views/School/EditSchoolProfile/node_modules/components/Account';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  container: {
    marginTop: '3rem',
    paddingTop: '2rem',
  },
}));

const TeacherProfile = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item lg={4} md={6} xs={12}>
          <Account />
        </Grid>
        <Grid item lg={8} md={6} xs={12}>
          <ProfileDetails profile="teacher" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeacherProfile;

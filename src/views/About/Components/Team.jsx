import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import profile from 'assets/img/faces/christian.jpg'
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

const styles = (theme) => ({
  root: {
    overflow: 'hidden',
    backgroundColor: theme.palette.primary.buttons,
  },
  container: {
    marginTop: '40px',
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: '170px',
    borderRadius: '50%',
    border: '#ae1e1e solid',
    marginBottom: '10px',
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
  },
  Icon__Values: {
    width: '2em',
    height: '2em',
  },
  Team_Div: {
    margin: '0 auto',
    maxWidth: '70vw',
    fontFamily: 'sans-serif',
  },
  Team_H1: {
    fontSize: 'xx-large',
    fontWeight: 800,
  },
  Team_H3: {
    fontSize: '18px',
  },
  Team_a: {
    margin: '10px',
    color: 'white',
  },
});



function ProductValues(props) {
  const { classes } = props;

  return (
      <>
    <section className={classes.root}>
    <div className={classes.Team_Div}>
    <h1 className={classes.Team_H1} >Conoce al Equipo</h1>
    <h3 className={classes.Team_H3}>Nosotros somos el equipo de desarrolladores que realizó el ecommerce "WineStore", el cual es un proyecto del bootcamp intensivo "Henry". Conocenos más a fondo en nuestras redes sociales.</h3>
    </div>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={3}>
            <div className={classes.item}>
            <img  className={classes.image} src={profile} alt='Logo'/>
            <div >
                <a className={classes.Team_a} href="https://www.linkedin.com">
                <LinkedInIcon/>
                </a>
                <a className={classes.Team_a} href="https://github.com/">
                <GitHubIcon/>
                </a>
            </div>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className={classes.item}>
            <img  className={classes.image} src={profile} alt='Logo'/>
            <div >
                <a className={classes.Team_a} href="https://www.linkedin.com">
                <LinkedInIcon/>
                </a>
                <a className={classes.Team_a} href="https://github.com/">
                <GitHubIcon/>
                </a>
            </div>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className={classes.item}>
            <img  className={classes.image} src={profile} alt='Logo'/>
            <div >
                <a className={classes.Team_a} href="https://www.linkedin.com">
                <LinkedInIcon/>
                </a>
                <a className={classes.Team_a} href="https://github.com/">
                <GitHubIcon/>
                </a>
            </div>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className={classes.item}>
            <img  className={classes.image} src={profile} alt='Logo'/>
            <div >
                <a className={classes.Team_a} href="https://www.linkedin.com">
                <LinkedInIcon/>
                </a>
                <a className={classes.Team_a} href="https://github.com/">
                <GitHubIcon/>
                </a>
            </div>
            </div>
          </Grid>
          <Grid item xs={12} md={2}>
            <div className={classes.item}>
            <img  className={classes.image} src={profile} alt='Logo'/>
            <div >
                <a className={classes.Team_a} href="https://www.linkedin.com">
                <LinkedInIcon/>
                </a>
                <a className={classes.Team_a} href="https://github.com/">
                <GitHubIcon/>
                </a>
            </div>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className={classes.item}>
            <img  className={classes.image} src={profile} alt='Logo'/>
            <div >
                <a className={classes.Team_a} href="https://www.linkedin.com">
                <LinkedInIcon/>
                </a>
                <a className={classes.Team_a} href="https://github.com/">
                <GitHubIcon/>
                </a>
            </div>
            </div>
          </Grid>
          <Grid item xs={12} md={2}>
            <div className={classes.item}>
            <img  className={classes.image} src={profile} alt='Logo'/>
            <div >
                <a className={classes.Team_a} href="https://www.linkedin.com">
                <LinkedInIcon/>
                </a>
                <a className={classes.Team_a} href="https://github.com/">
                <GitHubIcon/>
                </a>
            </div>
            </div>
          </Grid>
          <Grid item xs={12} md={3}>
            <div className={classes.item}>
            <img  className={classes.image} src={profile} alt='Logo'/>
            <div >
                <a className={classes.Team_a} href="https://www.linkedin.com">
                <LinkedInIcon/>
                </a>
                <a className={classes.Team_a} href="https://github.com/">
                <GitHubIcon/>
                </a>
            </div>
            </div>
          </Grid>
          <Grid item xs={12} md={2}>
            <div className={classes.item}>
            <img  className={classes.image} src={profile} alt='Logo'/>
            <div >
                <a className={classes.Team_a} href="https://www.linkedin.com">
                <LinkedInIcon/>
                </a>
                <a className={classes.Team_a} href="https://github.com/">
                <GitHubIcon/>
                </a>
            </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>

    </>
  );
}

ProductValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductValues);

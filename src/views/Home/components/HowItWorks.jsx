import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '../../../components/Home_MUI/Button';
import Typography from '../../../components/Home_MUI/Typography';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import CategoryIcon from '@material-ui/icons/Category';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { Link } from 'react-router-dom';
import { useAuth } from 'components/Auth/AuthContext';

const styles = (theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  title: {
    marginBottom: theme.spacing(14),
  },
  number: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily,
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightMedium,
  },
  image: {
    height: 55,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
    top: -180,
    opacity: 0.7,
  },
  button: {
    marginTop: theme.spacing(8),
  },
  Icon__Values: {
    width: '2em',
    height: '2em',
  },
});

function HowItWorks(props) {
  const { classes } = props;
  const user = useAuth();
  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Typography
          variant="h4"
          marked="center"
          className={classes.title}
          component="h2"
        >
          Como funciona
        </Typography>
        <div>
          <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>1.</div>
                <BorderColorIcon className={classes.Icon__Values} />
                <Typography variant="h4" align="center">
                  Crea tu Quiz
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>2.</div>
                <CategoryIcon className={classes.Icon__Values} />
                <Typography variant="h4" align="center">
                  Los estudiantes lo completan
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.item}>
                <div className={classes.number}>3.</div>
                <DoneAllIcon className={classes.Icon__Values} />
                <Typography variant="h4" align="center">
                  Corrige los resultados
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
        <Button
          color="secondary"
          size="large"
          variant="contained"
          className={classes.button}
          component={Link}
          to={Boolean(user) ? '/quiz-loader' : '/register'}
        >
          Comenzar
        </Button>
      </Container>
    </section>
  );
}

HowItWorks.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HowItWorks);

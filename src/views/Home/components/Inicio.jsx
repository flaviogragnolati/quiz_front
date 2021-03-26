import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import Button from '../../../components/Home_MUI/Button';
import { Button } from '@material-ui/core';
import Typography from '../../../components/Home_MUI/Typography';
import InicioBackground from './InicioBackground';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import { useAuth } from 'components/Auth/AuthContext';  

const backgroundImage =
  'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260';

const styles = (theme) => ({
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundColor: '#7fc7d9', // Average color of the background image.
    backgroundPosition: 'center',
  },
  button: {
    minWidth: 200,
  },
  h5: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(10),
    },
  },
  more: {
  marginTop: '20px',
  fontWeight: 'bold',
  fontSize: '20px',
  },
});

const HeroButton = styled(Button)`
  background-color: ${(p) => p.theme.palette.secondary.dark};
  color: ${(p) => p.theme.palette.primary.main};
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0;
  text-transform: uppercase;
  text-align: center;
  border: none;
  border-radius: 3px;
  position: relative;
  padding: 20px 40px;
  margin: 0.3125rem 1px;
  cursor: pointer;
  :hover {
    color: #ffffff;
    background-color: gray;
    box-shadow: 0 14px 26px -12px rgba(153, 153, 153, 0.42),
      0 4px 23px 0px rgba(0, 0, 0, 0.12),
      0 8px 10px -5px rgba(153, 153, 153, 0.2);
  }
  min-height: auto;
  min-width: auto;
  width: 100%;
  will-change: box-shadow, transform;
`;

function Inicio(props) {
  const { classes } = props;
  const user = useAuth();
  return (
    <>
      <InicioBackground backgroundClassName={classes.background}>
        {/* Increase the network loading priority of the background image. */}
        <img
          style={{ display: 'none' }}
          src={backgroundImage}
          alt="increase priority"
        />
        <Typography color="inherit" variant="h2">
          Tu Universidad Virtual
        </Typography>
        <Typography color="inherit" variant="h4" className={classes.h5}>
          Estudia desde cualquier parte del Mundo.
        </Typography>
        <Grid
          container
          spacing={10}
          direction="row"
          justify="center"
          alignItems="space-between"
        >
          {!user ?<Grid item xs={3}>
            
              <HeroButton
              color="primary"
              variant="contained"
              size="large"
              component={Link}
              to="/register"
            >
              Registrarse
            </HeroButton> 
          </Grid>: null}
          <Grid item xs={3}>
            <HeroButton
              color="secondary"
              variant="contained"
              size="large"
              component={Link}
              to="/catalogue"
            >
              Ver Catalogo
            </HeroButton>
          </Grid>
        </Grid>
        <Typography variant="h6" color="inherit" className={classes.more}>
          Descubre la Experiencia
        </Typography>
      </InicioBackground>
    </>
  );
}

Inicio.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Inicio);

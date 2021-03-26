import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Container from '@material-ui/core/Container';
import Typography from '../../../components/Home_MUI/Typography';
import { TextField } from '@material-ui/core';
import Button from '../../../components/Home_MUI/Button';
import { useDispatch } from 'react-redux';
import { contactSchool } from 'components/Auth/authSlice';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(10),
    marginBottom: 0,
    display: 'flex',
  },
  cardWrapper: {
    zIndex: 1,
  },
  card: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(8, 3),
  },
  cardContent: {
    maxWidth: 400,
  },
  textField: {
    width: '100%',
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    width: '100%',
  },
  imagesWrapper: {
    position: 'relative',
  },
  imageDots: {
    position: 'absolute',
    top: -67,
    left: -67,
    right: 0,
    bottom: 0,
    width: '100%',
    background: 'url(/static/onepirate/productCTAImageDots.png)',
  },
  image: {
    position: 'absolute',
    top: -28,
    left: -28,
    right: 0,
    bottom: 0,
    width: '100%',
    maxWidth: 600,
  },
});

function Contact(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const [formInfo, setFormInfo] = useState({
    correo: '',
    nombreSchool: '',
  });

  const handleChange = (event) => {
    setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let payload = {
      name: formInfo.nombreSchool,
      email: formInfo.correo,
    };
    dispatch(contactSchool(payload));
    setFormInfo({
      correo: '',
      nombreSchool: '',
    });
  };

  return (
    <Container className={classes.root} component="section">
      <Grid container>
        <Grid item xs={12} md={6} className={classes.cardWrapper}>
          <div className={classes.card}>
            <form onSubmit={handleSubmit} className={classes.cardContent}>
              <Typography variant="h2" component="h2" gutterBottom>
                Estoy Interesado
              </Typography>
              <Typography variant="h5">
                Nos pondremos en contacto para realizar el registro de la escuela.
              </Typography>
              <TextField
                noBorder
                variant="filled"
                name="correo"
                className={classes.textField}
                placeholder="Correo electronico"
                onChange={handleChange}
              />
              <TextField
                noBorder
                variant="filled"
                name="nombreSchool"
                className={classes.textField}
                placeholder="Nombre de la Institucion"
                onChange={handleChange}
              />
              <TextField
                noBorder
                variant="filled"
                name="pais"
                className={classes.textField}
                placeholder="Pais"
                onChange={handleChange}
              />
              <br />
              <br />
              <br />
              <Button
                type="submit"
                color="primary.dark"
                variant="contained"
                className={classes.button}
              >
                Estoy Interesado
              </Button>
            </form>
          </div>
        </Grid>
        <Grid item xs={12} md={6} className={classes.imagesWrapper}>
          <Hidden smDown>
            <div className={classes.imageDots} />
            <img
              src="https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
              alt="call to action"
              className={classes.image}
            />
          </Hidden>
        </Grid>
      </Grid>
    </Container>
  );
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contact);

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Typography from '../../../components/Home_MUI/Typography';
import { useHistory } from 'react-router-dom';



const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(9),
    marginBottom: theme.spacing(9),
  },
  button: {
    border: '4px solid currentColor',
    borderRadius: 0,
    height: 'auto',
    padding: theme.spacing(2, 5),

  },
  link: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  buoy: {
    width: 60,
  },
  typography_PSH: {
    fontWeight: 'bold',
  }
});

function Goodbye(props) {
  const { classes } = props;
  const history = useHistory()
  return (
    <Container className={classes.root} component="section">
      <Button className={classes.button}>
        <Typography onClick={() => {history.push('/QandA')}} className={classes.typography_PSH} variant="h4" component="span">
          Tienes preguntas? Necesitas ayuda?
        </Typography>
      </Button>
      <Typography variant="subtitle1" className={classes.link}>
        Estamos para ayudarte, ponte en contacto!
      </Typography>
    </Container>
  );
}

Goodbye.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Goodbye);

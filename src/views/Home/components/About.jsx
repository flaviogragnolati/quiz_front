import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '../../../components/Home_MUI/Typography';
import InfoIcon from '@material-ui/icons/Info';
import ContactsIcon from '@material-ui/icons/Contacts';
import LanguageIcon from '@material-ui/icons/Language';

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default,
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: '7vh',
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
    height: 55,
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
});

function About(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={5}>
          <Grid item xs={12} md={5}>
            <div className={classes.item}>
              <InfoIcon className={classes.Icon__Values} />
              <Typography variant="h4" className={classes.title}>
                Sobre Nosotros
              </Typography>
              <Typography variant="h5" Style="text-align: justify;">
              Somos una organización cuyo foco está en la educación virtual. A través de nuestra plataforma, queremos darle la posibilidad a las organizaciones educativas de que puedan gestionar de una manera sencilla la evaluación de los conocimientos adquiridos en sus actividades curriculares por medio de quizzes, mientras que les facilitamos a sus alumnos el ingreso a los mismos              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={2}>
          </Grid>
          <Grid item xs={12} md={5}>
            <div className={classes.item}>
              <LanguageIcon className={classes.Icon__Values} />
              <Typography variant="h4" className={classes.title}>
                Proyecto
              </Typography>
              <Typography color="primary.contrastText" variant="h5" Style="text-align: justify;">
              Con el inicio de la pandemia COVID-19, afloró el boom de los cursos a distancia, lo cual implica innovar en el sistema de calificación y de examinar los conocimientos adquiridos por los alumnos. Nuestro proyecto apunta a canalizar esa necesidad y a generar una forma mucho más sencilla de gestionar los exámenes, a la vez que brindamos la posibilidad de llegar a todos los alumnos de una manera ágil y rápida. Asimismo, les permitimos tanto a los alumnos como a las organizaciones poder gestionar las estadísticas con los resultados obtenidos.
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);

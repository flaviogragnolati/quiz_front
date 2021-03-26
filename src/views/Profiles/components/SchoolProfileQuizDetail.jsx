import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  Typography,
  Button,
  CardActionArea,
  CardMedia,
  CardActions,
  CardContent,
  Box,
} from '@material-ui/core/';
import Bookmark from 'components/Bookmark';
import { ACTIONS } from 'store/rootReducer';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    height: '100%',
    display: 'grid',
  },
  media: {
    height: 140,
  },
});

export default function SchoolProfileQuizDetail({ quizDetail, ...props }) {
  const {
    id,
    logo,
    name,
    description,
    Subject: { name: subjectName },
  } = quizDetail;
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleNotifications = (state) => {
    if (state) {
      dispatch(ACTIONS.actions.addToFavorites());
    } else {
      dispatch(ACTIONS.actions.removeFromFavorites());
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={logo} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          {' - '}
          <Typography gutterBottom variant="h6" component="h4">
            {subjectName}
          </Typography>
          <Typography  variant="body2" color="textSecondary" component="p">
            {description}{' '}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Box minWidth display="flex" flexDirection="row" justifyContent="space-between">
          <Button
            size="medium"
            color="secondary"
            component={Link}
            to={`/quiz-detail/${id}`}
          >
            Mas Informacion
          </Button>
          <Bookmark action={handleNotifications} />
        </Box>
      </CardActions>
    </Card>
  );
}

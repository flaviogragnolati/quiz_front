import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Button,
} from '@material-ui/core';

import InfoIcon from '@material-ui/icons/Info';
import PeopleIcon from '@material-ui/icons/People';
import Bookmark from '../Bookmark';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { catalogueEntitiesSelector } from 'utils/selectors';
import CatalogueTags from './CatalogueTags';
import { addToFavorites , removeFromFavorites} from 'slices/actionsSlice';
import { useAuth } from 'components/Auth/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  img: {
    maxWidth: '160px',
    width: '100%',
    margin: '0 auto',
    transform: 'translate3d(0, -50%, 0)',
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex',
  },
  statsIcon: {
    marginRight: theme.spacing(1),
  },
}));

const ImgCardContainer = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const QuizCard = ({ className, quiz, ...rest }) => {
  const entities = useSelector(catalogueEntitiesSelector);
  const {
    id,
    quantity,
    name,
    description,
    logo,
    Subject,
    School,
    QuizTags,
  } = quiz;
   const user = useAuth()

  const classes = useStyles();
  const dispatch = useDispatch();
  const handleNotifications = (state) => {
    if (state) {
      dispatch(addToFavorites({QuizId:id, UserId:user.id}))
    } else {
      dispatch(removeFromFavorites({QuizId:id, UserId:user.id}))

    }
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {name}
          </Typography>
          <Bookmark action={handleNotifications} />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <p>{entities.schools[School].name}</p>
          <p>{entities.subjects[Subject].name}</p>
        </Box>
        <Box display="flex" justifyContent="center" mb={3}>
          <ImgCardContainer src={logo} alt="quiz detail picture" />
        </Box>
        <Typography align="center" color="textPrimary" variant="body1">
          {description}
        </Typography>
        <br></br>
        <CatalogueTags tagList={QuizTags} />
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Box className={classes.statsItem} item>
            <Button
              component={Link}
              to={{
                pathname: `/quiz-detail/${id}`,
                state: {
                  quiz,
                },
              }}
            >
              <InfoIcon className={classes.statsIcon} color="action" />
              Más información
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
              ></Typography>
            </Button>
          </Box>
          <Box className={classes.statsItem} item>
            <PeopleIcon className={classes.statsIcon} color="action" />
            <Typography color="textSecondary" display="inline" variant="body2">
              {quantity} Estudiantes
            </Typography>
          </Box>
        </Grid>
      </Box>
    </Card>
  );
};

QuizCard.propTypes = {
  className: PropTypes.string,
  item: PropTypes.object.isRequired,
};

export default QuizCard;

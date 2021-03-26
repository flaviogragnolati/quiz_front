import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Parallax from 'components/Parallax/Parallax.js';
import styles from 'assets/jss/material-kit-react/views/profilePage.js';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from './profileSlice';
import { userProfileSelector, profileStatusSelector } from 'utils/selectors';
import BackdropLoading from 'components/Loading/BackdropLoading';


const bg_img =
  'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260';

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const dispatch = useDispatch();
  const id = parseInt(useParams().id);
  const profileStatus = useSelector(profileStatusSelector);
  const user = useSelector(userProfileSelector);

  useEffect(() => {
    if (profileStatus === 'idle' || user.id !== id) {
      dispatch(getUserData(id));
    }
  }, [dispatch, profileStatus, user, id]);

  const classes = useStyles();

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  let content;
  if (profileStatus === 'pending') {
    content = <BackdropLoading />;
  } else if (profileStatus === 'error') {
    content = <h1>Ha ocurrido un error...metele F5</h1>;
  } else if (profileStatus === 'success') {
    const { firstName, lastName, birthdate, photo } = user;
    content = (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={6}>
            <div className={classes.profile}>
              <div>
                <img src={photo} alt="..." className={imageClasses} />
              </div>
              <div className={classes.name}>
                <h1 className={classes.title}>{`${firstName} ${lastName}`}</h1>
                <h3 className={classes.subtitle}>{birthdate}</h3>
              </div>
            </div>
          </GridItem>
        </GridContainer>
      </div>
    );
  }

  return (
    <div>
      <>
        <Parallax small filter image={bg_img} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>{content}</div>
        </div>
      </>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
import People from '@material-ui/icons/People';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import DateRangeIcon from '@material-ui/icons/DateRange';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import RegisterHeader from 'components/Form/RegisterHeader';
import CardFooter from 'components/Card/CardFooter.js';

import { useDispatch, useSelector } from 'react-redux';
// import { createUser } from './registerSlice';
import { Formik, Form, Field } from 'formik';

import styles from 'assets/jss/material-kit-react/views/loginPage.js';
import { TextField } from 'formik-material-ui';
import { DatePicker } from 'formik-material-ui-pickers';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { registerUser } from 'components/Auth/authSlice';
import { authStatusSelector, userSelector } from 'utils/selectors';

import {
  registerModel,
  initialState_Register,
  registerValidationSchema,
} from 'utils/forms/register';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles(styles);

const image =
  'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260';

const GreyText = styled(Link)`
  color: ${(p) => p.theme.grey};
`;

function Register(props) {
  const {
    firstName,
    lastName,
    email,
    password,
    cellphone,
    birthdate,
  } = registerModel;

  const [cardAnimaton, setCardAnimation] = useState('cardHidden');
  setTimeout(function () {
    setCardAnimation('');
  }, 700);
  const classes = useStyles();
  const dispatch = useDispatch();
  const userStatus = useSelector(authStatusSelector);
  const history = useHistory();
  const user = useSelector(userSelector);

  useEffect(() => {
    if (userStatus === 'success') {
      history.push(`/profile/${user.id}`);
    }
  }, [userStatus, history, user.id]);

  const handleSubmit = (data, formik) => {
    dispatch(registerUser(data));
  };

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(' + image + ')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes[cardAnimaton]}>
                <RegisterHeader />
                <Formik
                  onSubmit={handleSubmit}
                  initialValues={initialState_Register}
                  validationSchema={registerValidationSchema}
                >
                  {(formik) => (
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Form className={classes.form}>
                        <p className={classes.divider}>Or Be Classical</p>
                        <CardBody>
                          <Field
                            className={classes.Register__Fields}
                            component={TextField}
                            name={firstName.name}
                            label={firstName.label}
                            fullWidth
                            color="secondary"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <People className={classes.inputIconsColor} />
                                </InputAdornment>
                              ),
                            }}
                          />
                          <Field
                            className={classes.Register__Fields}
                            component={TextField}
                            name={lastName.name}
                            label={lastName.label}
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <SupervisorAccountIcon
                                    className={classes.inputIconsColor}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                          <Field
                            className={classes.Register__Fields}
                            component={TextField}
                            name={email.name}
                            label={email.label}
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Email className={classes.inputIconsColor} />
                                </InputAdornment>
                              ),
                            }}
                          />
                          <Field
                            className={classes.Register__Fields}
                            component={TextField}
                            name={password.name}
                            label={password.label}
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Icon className={classes.inputIconsColor}>
                                    lock_outline
                                  </Icon>
                                </InputAdornment>
                              ),
                              autoComplete: 'off',
                            }}
                          />
                          <Field
                            className={classes.Register__Fields}
                            component={TextField}
                            name={cellphone.name}
                            label={cellphone.label}
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <PhoneAndroidIcon
                                    className={classes.inputIconsColor}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                          <Field
                            className={classes.Register__Date}
                            component={DatePicker}
                            name={birthdate.name}
                            label={birthdate.label}
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <DateRangeIcon
                                    className={classes.inputIconsColor}
                                  />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </CardBody>
                        <CardFooter className={classes.cardFooter}>
                          <Button type="submit" color="primary" size="lg">
                            Register
                          </Button>
                        </CardFooter>
                      </Form>
                    </MuiPickersUtilsProvider>
                  )}
                </Formik>
                <GreyText
                  to="/registerSchool"
                  className={classes.Register__School}
                >
                  Registrar como escuela
                </GreyText>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

export default Register;

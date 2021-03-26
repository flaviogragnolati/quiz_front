import React, { useEffect } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
// @material-ui/icons
import Email from '@material-ui/icons/Email';
import DescriptionIcon from '@material-ui/icons/Description';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import PublicIcon from '@material-ui/icons/Public';
// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';

import styles from 'assets/jss/material-kit-react/views/loginPage.js';
import { TextField } from 'formik-material-ui';
//import { registerUser } from 'components/Auth/authSlice';
import { finalRegisterSchool } from 'components/Auth/authSlice';
import { useHistory } from 'react-router-dom';
import { authStatusSelector } from 'utils/selectors';

const useStyles = makeStyles(styles);
const image =
  'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260';

function RegisterSchool(props) {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  setTimeout(function () {
    setCardAnimation('');
  }, 700);
  const classes = useStyles();
  //const { ...rest } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const userStatus = useSelector(authStatusSelector);

  const registerInitialValues = {
    name: '',
    city: '',
    email: '',
    password: '',
    country: '',
    description: '',
    code: '',
  };

  useEffect(() => {
    if (userStatus === 'success') {
      history.push("/home");
    }
  }, [userStatus, history]);

  const handleSubmit = (data, formik) => {
    dispatch(finalRegisterSchool(data));
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
                <CardHeader color="primary" className={classes.cardHeader}>
                  <h3>School Register</h3>
                  {/* <div className={classes.socialLine}>
                    <Button
                      justIcon
                      href="#pablo"
                      target="_blank"
                      color="transparent"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button
                      justIcon
                      href="#pablo"
                      target="_blank"
                      color="transparent"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className={"fab fa-facebook"} />
                    </Button>
                    <Button
                      justIcon
                      href="#pablo"
                      target="_blank"
                      color="transparent"
                      onClick={(e) => e.preventDefault()}
                    >
                      <i className={"fab fa-google-plus-g"} />
                    </Button>
                  </div> */}
                </CardHeader>
                <Formik
                  onSubmit={handleSubmit}
                  initialValues={registerInitialValues}
                >
                  {(formik) => (
                    <Form className={classes.form}>
                      {/* <p className={classes.divider}>Or Be Classical</p> */}
                      <CardBody>
                        <Field
                          className={classes.Register__Fields}
                          component={TextField}
                          name="name"
                          label="Name"
                          fullWidth
                          color="primary"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <VpnKeyIcon
                                  className={classes.inputIconsColor}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Field
                          className={classes.Register__Fields}
                          component={TextField}
                          label="Email..."
                          name="email"
                          fullWidth
                          InputProps={{
                            type: 'email',
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
                          label="Codigo de Registro"
                          name="code"
                          fullWidth
                          InputProps={{
                            type: 'tel',
                            endAdornment: (
                              <InputAdornment position="end">
                                <VpnKeyIcon
                                  className={classes.inputIconsColor}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Field
                          className={classes.Register__Fields}
                          component={TextField}
                          label="Password"
                          name="password"
                          fullWidth
                          InputProps={{
                            type: 'password',
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
                          name="description"
                          label="Description"
                          fullWidth
                          color="primary"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <DescriptionIcon
                                  className={classes.inputIconsColor}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Field
                          className={classes.Register__Fields}
                          component={TextField}
                          name="logo"
                          label="logo"
                          fullWidth
                          color="primary"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <DescriptionIcon
                                  className={classes.inputIconsColor}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Field
                          className={classes.Register__Fields}
                          component={TextField}
                          label="Country"
                          name="country"
                          fullWidth
                          InputProps={{
                            type: 'tel',
                            endAdornment: (
                              <InputAdornment position="end">
                                <PublicIcon
                                  className={classes.inputIconsColor}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <Field
                          className={classes.Register__Fields}
                          component={TextField}
                          label="City"
                          name="city"
                          fullWidth
                          InputProps={{
                            type: 'text',
                            endAdornment: (
                              <InputAdornment position="end">
                                <LocationCityIcon
                                  className={classes.inputIconsColor}
                                />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <Button type="submit" color="primary" size="lg">
                          Register School
                        </Button>{' '}
                      </CardFooter>
                    </Form>
                  )}
                </Formik>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

export default RegisterSchool;

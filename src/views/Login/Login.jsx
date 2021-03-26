import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import LoginHeader from "components/Form/LoginHeader";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import styles from "assets/jss/material-kit-react/views/loginPage.js";

import {
  registerModel,
  initialState_Login,
  loginValidationSchema,
} from "utils/forms/register";
import { TextField } from "formik-material-ui";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "store/rootReducer";
import { localLogin } from "components/Auth/authSlice";
import { userSelector, authStatusSelector } from "utils/selectors";

import { useHistory } from "react-router-dom";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles(styles);
const image =
  "https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260";



function Login() {
  const { email, password } = registerModel;
  const dispatch = useDispatch();
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");
  const user = useSelector(userSelector);
  const authState = useSelector(authStatusSelector);
  const History = useHistory();
  const [viewPassword, setViewPassword] = useState(false);
  setTimeout(function () {
    setCardAnimation("");
  }, 700);

  useEffect(() => {
    if (user.id) {
      History.push(`/profile/${user.id}`);
    }
  }, [user]);

  const classes = useStyles();

  const handleSubmit = (values, formik) => {
    dispatch(localLogin(values));
    formik.resetForm({values: {
      email: values.email,
      password: '',
    }})
    
  };

  const handleClickShowPassword = () => {
    setViewPassword(!viewPassword);
  };
  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={6}>
              <Card className={classes[cardAnimaton]}>
                <LoginHeader />

                {authState === 'error' ? <p className={classes.divider} className={classes.Error__Message}>El Login fue rechazado, intenta de nuevo</p> : null}
                <Formik
                  onSubmit={handleSubmit}
                  initialValues={initialState_Login}
                  validationSchema={loginValidationSchema}
                >
                  {(formik) => (
                    <Form>
                      <CardBody>
                        <Field
                          className={classes.Register__Fields}
                          component={TextField}
                          name={email.name}
                          label={email.label}
                          fullWidth
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  disabled="true"
                                  Style="padding: 0px;"
                                >
                                  <Email className={classes.inputIconsColor}/>
                                </IconButton>
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
                          type={viewPassword ? "text" : "password"}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment
                                position="end"
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                              >
                                <IconButton Style="padding: 0px;">
                                  {viewPassword ? (
                                    <Visibility className={classes.inputIconsColor}/>
                                  ) : (
                                    <VisibilityOff className={classes.inputIconsColor}/>
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                            autoComplete: "off",
                          }}
                        />
                      </CardBody>
                      <CardFooter className={classes.cardFooter}>
                        <Button color="primary" size="lg" type="submit">
                          Login
                        </Button>

                        <Button
                          to="/loginSchool"
                          className={classes.Register__School}
                          className={classes.inputIconsColor}
                          onClick={() => {History.push(`/loginSchool`); dispatch(ACTIONS.auth.setStateReset());}}
                        >
                          <span Style="color: #1e1e1e;">
                          Login como escuela
                          </span>
                        </Button>
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

export default Login;

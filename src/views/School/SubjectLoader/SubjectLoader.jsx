import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Field } from "formik";
import {  TextField } from "formik-material-ui";
import { subjectModel } from "./quizLoderHelpers";
import { Typography, Button, Container, FormControl } from "@material-ui/core";
import { Formik, Form } from "formik";
import { initialState_Subjects } from "./quizLoderHelpers";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { createSubject } from "../SchoolSlice";
import { useHistory, useParams } from "react-router-dom";
import { SchoolSubjectSelector, SchoolStatusSelector, SchoolSubjectStatusSelector } from 'utils/selectors';
import { editSubject, afterSubject } from "../SchoolSlice";
import { userSelector } from "utils/selectors";


const { name, description } = subjectModel;

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  container_Loader: {
    margin: '10vh auto',
    padding: '5vh',
    border: 'solid #646464 1px',
  },
}));

export default function SubjectLoader() {
  const dispatch = useDispatch();
  const datos = useParams();
  const subjects = useSelector(SchoolSubjectSelector)
  const status = useSelector(SchoolStatusSelector)
  const subjectsStatus = useSelector(SchoolSubjectStatusSelector)
  const school = useSelector(userSelector)
  const history= useHistory()
  const classes = useStyles();



  const handleSubmit = (values) => {
    if (subjects !== undefined && datos.id) {
      values.id = datos.id
      dispatch(editSubject(values))
    } else {
      values.SchoolId = school.id
      dispatch(createSubject(values))
    }
  };


  let editValues = initialState_Subjects
  if (status === 'success' && subjects[0] !== undefined && datos.id) {
    editValues = {
      [name.name]:subjects.find((e) => e.id === (datos.id * 1)).name,
      [description.name]: subjects.find((e) => e.id === (datos.id * 1)).description,
    };
  }

  useEffect(() => {
    if (subjectsStatus === 'success') {
      history.push('/school-subject')
      dispatch(afterSubject())
    }

  }, [subjectsStatus])

  return (
    <Container className={classes.container_Loader } >
      <Typography variant="h6" gutterBottom>
        Cargar Materias
      </Typography>
      <Formik onSubmit={handleSubmit} initialValues={editValues}>
        {(formik) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name={name.name}
                  label={name.label}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name={description.name}
                  label={description.label}
                  fullWidth
                />
              </Grid>
              <FormControl></FormControl>
            </Grid>
            <Button variant="contained" color="primary" type="submit">
              {' '}
              Subir Materia{' '}
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

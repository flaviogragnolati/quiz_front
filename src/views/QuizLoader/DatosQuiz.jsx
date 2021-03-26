import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { quizModel } from './quizLoderHelpers';
import {
  Typography,
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
} from '@material-ui/core';
// import { quizModel } from './quizLoderHelpers';
import { Formik, Form } from 'formik';
import { initialState_Quiz } from './quizLoderHelpers';
import { useDispatch, useSelector } from 'react-redux';
import { CreateQuiz } from './QuizLoaderSlice';
import { makeStyles } from '@material-ui/core/styles';
import { getSubjectsList } from "views/School/SchoolSlice";
import { afterQuiz } from 'views/QuizLoader/QuizLoaderSlice';
import { SchoolSubjectSelector } from "utils/selectors"
import { useAuth } from 'components/Auth/AuthContext';
import { useHistory } from 'react-router-dom';
import { QuestionStatusSelector } from 'utils/selectors';
const { nameQuiz, descripcion } = quizModel;

export default function DatosQuiz() {
  const dispatch = useDispatch()
  const history = useHistory()
  const subjects = useSelector(SchoolSubjectSelector);
  const status = useSelector(QuestionStatusSelector)
  const [personName, setPersonName] = React.useState('');
  const school = useAuth()
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleSubmit = (values,) => {
    values.SubjectId = personName
    values.SchoolId = school.id;
    dispatch(CreateQuiz(values));
  };

  useEffect(() => {
    dispatch(getSubjectsList({ id: school.id }))
  }, [])

  useEffect(() => {
    if (status === 'success') {
      history.push('/school-quiz')
      dispatch(afterQuiz())
    }
  }, [status])

  return (
    <Container Style="margin-top: 8vh;border: 1px solid #464646;padding: 24px;">
      <Typography variant="h6" gutterBottom>
        Informacion general Quizz
      </Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialState_Quiz}>
        {(formik) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name={nameQuiz.name}
                  label={nameQuiz.label}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name={descripcion.name}
                  label={descripcion.label}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field component={TextField} name="logo" label="URl" />
              </Grid>
              <Container Style="padding: 12px;">
                <FormControl >
                  <InputLabel id="demo-mutiple-chip-label" fullWidth>
                    Selecciona una Materia
                  </InputLabel>
                  <Select
                    Style="min-width: 180px;"
                    labelId="demo-mutiple-chip-label"
                    id="demo-mutiple-chip"
                    value={personName}
                    onChange={handleChange}
                    input={<Input id="select-multiple-chip" />}
                    MenuProps={MenuProps}
                  >
                    {!!subjects &&
                      subjects.map((subject) => (
                        <MenuItem key={subject.id} value={subject.id}>
                          {subject.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Container>
            </Grid>
            <Button
              variant="contained"
              color="primary"
              // className={classes.button}
              type="submit"
              Style="margin: 26px 0px;"
            >
              Submit Quiz
            </Button>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

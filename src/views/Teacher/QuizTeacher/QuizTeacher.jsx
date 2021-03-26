import React, { useEffect } from 'react';
import { Box, Container } from '@material-ui/core';
import List from 'components/List';
import { useDispatch, useSelector } from 'react-redux';
import {
  TeacherQuizSelector,
  TeacherQuizStatusSelector,
  userSelector,
} from 'utils/selectors';
import { getQuizesTeacher } from 'views/Teacher/TeacherSlice';
import { activationQuiz } from 'views/Teacher/TeacherSlice';
import { useHistory } from 'react-router-dom';
import BackdropLoading from 'components/Loading/BackdropLoading';

function QuizTeacher() {
  const dispatch = useDispatch();
  const quizes = useSelector(TeacherQuizSelector);
  const status = useSelector(TeacherQuizStatusSelector);
  const user = useSelector(userSelector);
  const History = useHistory()

  let handlerActivation = (e) => {
    dispatch(activationQuiz(e))
  }

  let handlerQuestions = (e) => {
    History.push(`/question-loader/${e}`)
  }

  let handlerEnroll = (e) => {
    History.push(`/enroll-list/${e}`);
  }

  let columnName = ['Nombre del Quiz', 'Description', 'Estado', 'Activar Quiz', 'Preguntas', 'Aceptar alumnos'];
  let propsNames = ['name', 'description', 'active', 'Activar', 'Editar', 'Enrollar']
  let actions = {
    Activar: handlerActivation,
    Editar: handlerQuestions,
    Enrollar: handlerEnroll,
  }

  useEffect(() => {
    dispatch(getQuizesTeacher(user.id));
  }, [user]);

  return (
    <Container maxWidth={false}>
      <Box mt={3}>
        <h3>Listado de Quizzes</h3>
        {status === 'success' ? (
          <List
            customers={quizes}
            propsNames={propsNames} columnName={columnName} actions={actions}
            User={user}
          />
        ) : (
            <BackdropLoading/>
          )}
      </Box>
    </Container>
  );
};

export default QuizTeacher

import React, { useEffect, useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import List from 'components/List';
import Button from 'components/Home_MUI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { delateQuiz, getQuizList, getTeachersQuiz } from '../SchoolSlice';
import { SchoolQuizSelector, SchoolStatusSelector, } from 'utils/selectors';
import { userSelector } from 'utils/selectors';
import ModalTeacher from 'components/List/Modal';
import { useHistory } from 'react-router-dom';
import BackdropLoading from 'components/Loading/BackdropLoading';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const SchoolQuiz = () => {
  const dispatch = useDispatch();
  const quizes = useSelector(SchoolQuizSelector);
  const status = useSelector(SchoolStatusSelector);
  const school = useSelector(userSelector)
  const [QuizId, setQuizId] = useState(0);
  const [open, setOpen] = useState(false);
  const history = useHistory()

  let columnName = ['Nombre del Quiz', 'Materia', 'Descripción' ,'Eliminar','Profesores','Profesores'];
  let propsNames = ['name', 'Subject', 'description', 'Borrar', 'Añadir', 'Ver'];
  
  const handleDelete = (e)=>{
    dispatch(delateQuiz(e));
  }

  const handleAdd = (e)=>{
    setOpen(true);
    setQuizId(e);
  }

  const handleSee = (e)=>{
    dispatch(getTeachersQuiz({QuizId: e}))
    history.push('/quiz-teacher/')
  }

  const handleAddQuiz = (e)=>{
    history.push('/quiz-loader/')
  }

  let actions = {
    Borrar: handleDelete,
    Añadir:handleAdd,
    Ver:handleSee,
  }
  
  useEffect(() => {
    dispatch(getQuizList({id: school.id}));
  }, [school]);

 
  return (
    <Container maxWidth={false}>
      <Box mt={3}>
        <h3>Listado de Quizzes</h3>
        {status === 'success' ? (
          <List
            customers={quizes}
            propsNames={propsNames}
            columnName={columnName}
            actions={actions}
          />
        ) : (
          <BackdropLoading/>
        )}
      </Box>
      <Button onClick={() =>handleAddQuiz()}>Agregar + </Button>
      <ModalTeacher Id={QuizId} open={open} setOpen={setOpen}></ModalTeacher>
    </Container>
  );
};

export default SchoolQuiz;
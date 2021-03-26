import React, { useEffect } from 'react';
import { Box, Container } from '@material-ui/core';
import List from 'components/List';
import { useDispatch, useSelector } from 'react-redux';
import {
    TeacherEnrollSelector,
    TeacherEnrollStatusSelector,
    userSelector,
} from 'utils/selectors';
import { getToEnrollList } from 'views/Teacher/TeacherSlice';
import { useParams } from 'react-router-dom';
import { enrollToSudent } from '../TeacherSlice';

function EnrollTeacher() {
    const params = useParams();
    const dispatch = useDispatch();
    const students = useSelector(TeacherEnrollSelector);
    const status = useSelector(TeacherEnrollStatusSelector);
    const user = useSelector(userSelector);
    let columnName = ['Nombre Alumno' , 'Email Alumno', 'Aceptar','Aceptar alumnos'];
    let propsNames = ['name', 'email', 'Aceptar', 'Rechazar']

  
  const handleAccept = (e)=>{
    dispatch(enrollToSudent({ QuizId: params.id, UserId: e, accepted: true }))
  }
  const handleReject =(e)=>{
    dispatch(enrollToSudent({ QuizId: params.id, UserId: e, accepted: false }))
  }

  const actions = {
    Aceptar: handleAccept,
    Rechazar: handleReject,
  }
    useEffect(() => {
      dispatch(getToEnrollList(params.id));
    }, [user]);

    return (
      <Container maxWidth={false}>
        <Box mt={3}>
          <h2>Listado de Usuarios solicitando ser enrolados en el Quiz</h2>
          {(status === 'success' && students.length === 0 ? <h3>No hay alumnos esperando a ser agregados al Quiz</h3> : status === 'success' ? (
            <List
              customers={students}
              columnName={columnName}
              User={user}
              propsNames={propsNames}
              actions={actions}
            />
          ) : <h1>Cargando</h1>
          )}
        </Box>
      </Container>
    );
  };


export default EnrollTeacher

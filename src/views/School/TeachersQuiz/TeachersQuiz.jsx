import React from 'react';
import { Box, Container } from '@material-ui/core';
import List from 'components/List';

import Button from 'components/Home_MUI/Button';
import { useSelector } from 'react-redux';
import { SchoolTeachersSelector } from 'utils/selectors';
import { SchoolStatusSelector } from 'utils/selectors';
import BackdropLoading from 'components/Loading/BackdropLoading';
import { useHistory } from 'react-router-dom';

const TeachersQuiz = () => {

  const statusSchool = useSelector(SchoolStatusSelector)
  const teachers = useSelector(SchoolTeachersSelector)
  const columnName = ['Name', 'Apellido', 'Correo Electronico', ];
  const propsNames=['firstName','lastName','email']
  const history  = useHistory()
  
  return (
    <Container maxWidth={false}>
      {statusSchool === "success" ? 
      <Box mt={3}>
        <h3>Listado de Profesores de este Quiz</h3>
        {teachers.length === 0 ? <h2>No hay Profesores en este Quiz,puedes cargar profesores en el listado de Quizes</h2> :<List customers={teachers} columnName={columnName} propsNames={propsNames} />}
      </Box> : statusSchool === undefined ? <><h2>403 forbidden</h2><Button onClick={() =>history.push('/')} >Regresar al Inicio</Button></> : <BackdropLoading/>}

    </Container>
  );
};

export default TeachersQuiz;

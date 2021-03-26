import React, { useEffect } from 'react';
import { Box, Button, Container } from '@material-ui/core';
import List from '../../../components/List';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectsList } from '../SchoolSlice';
import {
  schoolSubjectErrorSelector,
  SchoolSubjectSelector,
  SchoolStatusSelector,
} from 'utils/selectors';
import { userSelector } from 'utils/selectors';
import { deleteSubject } from 'views/School/SchoolSlice';
import { Link, useHistory } from 'react-router-dom';
import BackdropLoading from 'components/Loading/BackdropLoading';


const SchoolSubject = () => {
  // const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const subjects = useSelector(SchoolSubjectSelector);
  const subjectsStatus = useSelector(SchoolStatusSelector); // esto no es subjeect status
  const school = useSelector(userSelector);
  const deleteError = useSelector(schoolSubjectErrorSelector);

  useEffect(() => {
    dispatch(getSubjectsList({ id: school.id }));
  }, [school]);

  useEffect(() => {
    if (Boolean(deleteError)) {
      alert(deleteError);
    }
  }, [deleteError, subjects, dispatch]);

  let handlerDelete = (subjectId) => {
    dispatch(deleteSubject({ subjectId, schoolId: school.id }));
  };

  let handlerEdit = (e) => {
    history.push({
      pathname: `/subject-loader/${e}`,
      state: {
        edit: true,
      },
    });
  };

  let columnName = ['Nombre', 'Description', 'Borrar', 'Editar Materia'];
  let propsNames = ['name', 'description', 'Borrar', 'Editar'];
  let actions = {
    Borrar: handlerDelete,
    Editar: handlerEdit,
  };

  return (
    <Container maxWidth={false}>
      <h1>Lista de Materias de la Escuela</h1>
      <Box mt={3}>
        {subjectsStatus === 'success' ? (
          <List
            customers={subjects}
            propsNames={propsNames}
            columnName={columnName}
            actions={actions}
          />
        ) : (
          <BackdropLoading />
        )}
      </Box>
      <Button component={Link} to="/subject-loader">
        Agregar Materia
      </Button>
    </Container>
  );
};

export default SchoolSubject;

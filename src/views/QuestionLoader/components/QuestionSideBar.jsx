import React, { useEffect, useContext, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  Typography,
  makeStyles,
} from '@material-ui/core';
import BallotIcon from '@material-ui/icons/Ballot';
import QuestionItem from './QuestionItem';
import { QuestionsSelector } from 'utils/selectors';
import { addQuestion } from 'views/QuizLoader/QuizLoaderSlice';
import { v4 as uuid } from 'uuid';
import { removeQuestion } from 'views/QuizLoader/QuizLoaderSlice';
import { IdsContext } from '../QuestionLoader';
import { updateQuestionData } from './questionHelpers';
import SaveIcon from '@material-ui/icons/Save';
import { bulkUpdateQuestions } from '../../QuizLoader/QuizLoaderSlice';

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 280,
    top: 64,
    height: 'calc(100% - 64px)',
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64,
  },
}));

function QuestionSideBar(props, ref) {
  const { setQuestionId, quizDetail } = props;

  const dispatch = useDispatch();
  const classes = useStyles();

  const { questionId, quizId } = useContext(IdsContext);

  const questions = useSelector(QuestionsSelector);
  useEffect(() => {}, [questions]);
  //recibe setId desde QuestionLoader para guardar el id en su estado local
  const handleAddQuestion = () => {
    updateQuestionData(ref, questionId, dispatch);
    let question = {
      id: uuid(),
      title: '',
      question: '',
      modifiedBy: 1, //traer el id del user, por ahora hardcordeado
      createdBy: 1, //idem modifiedby
      Answers: [{ id: uuid(), text: '', correct: false }],
      QuizId: quizId,
      type: 1,
    };
    updateQuestionData(ref, questionId, dispatch);
    dispatch(addQuestion({ question }));
  };

  const handleDeleteQuestion = (id) => {
    console.log('ID', id, questionId);
    // updateQuestionData(ref, questionId, dispatch);
    dispatch(removeQuestion(id));
  };

  const handleSaveAll = () => {
    /**
     * al guarda en Redux cada vez que se:
     * 1. cambia de pregunta,
     * 2. se agrega una nueva pregunta
     * 3. se borra una pregunta
     * 4. se agrega una nueva respuesta
     * 5. [x] se cambio el tipo de pregunta (?)
     *
     * No es necesario guardar todos los cambio juntos,
     * solamente hay que guardar los cambios del form activo
     * para eso despachamos la accion updateQuestionData con el form activo
     * Luego despachamos una accion Async con toda la nueva data
     *
     */
    updateQuestionData(ref, questionId, dispatch);
    dispatch(bulkUpdateQuestions({ quizId }));
  };

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar className={classes.avatar} src={quizDetail.logo} />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {quizDetail.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {quizDetail.Subject.name}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List component={'ol'}>
          {questions &&
            questions.map((question, idx) => {
              return (
                <QuestionItem
                  key={question.title}
                  title={`${idx + 1} ${question.title}`}
                  icon={BallotIcon}
                  ref={ref}
                  setQuestionId={setQuestionId} // se le pasa setId para objener desde dentro el id de la pregunta
                  handleDeleteQuestion={handleDeleteQuestion}
                  id={question.id}
                />
              );
            })}
        </List>
      </Box>
      <Box
        p={2}
        m={2}
        display="flex"
        flexGrow="1"
        flexDirection="row"
        justifyContent="space-between"
      >
        <Button
          color="primary"
          size="small"
          variant="contained"
          onClick={handleAddQuestion}
        >
          Añadir pregunta
        </Button>
        <Button
          color="secondary"
          size="small"
          variant="contained"
          onClick={handleSaveAll}
          startIcon={<SaveIcon />}
        >
          Guardar Todo
        </Button>
      </Box>
    </Box>
  );
}

QuestionSideBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

QuestionSideBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

QuestionSideBar = forwardRef(QuestionSideBar);
export default QuestionSideBar;

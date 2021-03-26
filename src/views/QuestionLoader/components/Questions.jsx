import React, {
  useState,
  useContext,
  forwardRef,
} from 'react';
import { Grid, Typography, IconButton } from '@material-ui/core';
import AddCircleOutlineTwoToneIcon from '@material-ui/icons/AddCircleOutlineTwoTone';
import QuestionInfo from './QuestionInfo';
import QuestionTF from './QuestionTF';
import QuestionType from './QuestionType';
import { useDispatch, useSelector } from 'react-redux';
import { QuestionsSelector } from 'utils/selectors';
import QuestionMultiWrapper from './QuestionMultiWrapper';
import { IdsContext } from '../QuestionLoader';
import { v4 as uuid } from 'uuid';
import { addAnswer } from 'views/QuizLoader/QuizLoaderSlice';
import { updateQuestionData, useUpdateQuestion } from './questionHelpers';
const questionInfo = {
  title: 'QCD - enunciado',
  description:
    'La QCD (Cromodinamica Cuantica) es una teoria que cuantica de campos que describe: (seleccionar todas las correctas)',
  answers: [
    { id: 1, text: 'Describe la interaccion atomica fuerte', correct: true },
    {
      id: 2,
      text: 'Permite entender la estructura de los Bariones',
      correct: true,
    },
    {
      id: 3,
      text: 'Define los colores que le gustan a los fisicos',
      correct: false,
    },
    { id: 4, text: 'No pertenece al modelo estandar', correct: true },
    {
      id: 5,
      text:
        'Mide los colores de las particulas subatomicas a traves de la `cara de color`',
      correct: false,
    },
  ],
  answersTF: [
    { text: 'Verdadero', correct: true },
    { text: 'Falso', correct: false },
  ],
};

function Questions(props, ref) {
  const dispatch = useDispatch();

  const { questionId } = useContext(IdsContext);
  const { questionInfoRef, answersContentRef } = ref;

  const question = useSelector((state) => QuestionsSelector(state, questionId));
  const answers = question && question.Answers;

  const [multi, setMulti] = useState();

  if (!questionId) return null;

  // recibe question que es el estado filtrado sincronamente. contiene el detalle de la pregunta y las respuestas

  const handleAnsAdd = () => {
    updateQuestionData(ref, questionId, dispatch);
    dispatch(addAnswer({ id: uuid(), questionId }));
  };

  let ansContent;
  if (!question || multi === undefined) ansContent = null;
  else if (multi === 1) {
    ansContent = (
      <QuestionMultiWrapper answers={answers} ref={answersContentRef} />
    );
  } else if (multi === 2) {
    ansContent = (
      <QuestionTF answer={questionInfo.answersTF} ref={answersContentRef} />
    );
  }

  return (
    <>
      <Grid item xs={12}>
        <Typography Style="margin: 20px 0px;" variant="h4">
          Edita la Pregunta
        </Typography>
      </Grid>
      <br></br>
      <Grid
        item
        container
        xs={8}
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        {question && (
          <QuestionInfo
            title={question.title}
            question={question.question}
            ref={questionInfoRef}
          />
        )}
      </Grid>
      <Grid
        item
        container
        xs={4}
        direction="row"
        justify="flex-end"
        alignItems="flex-start"
      >
        {question && <QuestionType setMulti={setMulti} />}
      </Grid>
      <Grid
        item
        container
        xs={12}
        gap={10}
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        {ansContent}
      </Grid>
      {multi === 1 && (
        <Grid
          item
          container
          xs={12}
          direction="row"
          justify="flex-end"
          alignItems="flex-end"
        >
          <IconButton onClick={handleAnsAdd}>
            <AddCircleOutlineTwoToneIcon
              fontSize="large"
              style={{ color: 'lightblue' }}
            />
          </IconButton>
        </Grid>
      )}
    </>
  );
}

Questions = forwardRef(Questions);
export default Questions;

import React, { useEffect, useState, createContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import BackdropLoading from 'components/Loading/BackdropLoading';
import QuestionSideBar from './components/QuestionSideBar';
import Questions from './components/Questions';
import { getAllQuestions } from 'views/QuizLoader/QuizLoaderSlice';
import { quizDetailSelector, quizDetailStatusSelector } from 'utils/selectors';
import { getQuizDetailAsync } from 'views/QuizProfile/quizDetailSlice';
import { QuestionStatusSelector } from 'utils/selectors';
import { questionsSavedSelector } from 'utils/selectors';
import { ACTIONS } from 'store/rootReducer';

export const IdsContext = createContext(null);

function QuestionLoader() {
  const dispatch = useDispatch();
  const quizId = useParams().id;

  const questionInfoRef = useRef(null);
  const answersContentRef = useRef(null);
  const formikRefs = { questionInfoRef, answersContentRef };

  const quizDetail = useSelector((state) => quizDetailSelector(state, quizId));
  const questionsStatus = useSelector(QuestionStatusSelector);
  const quizDetailStatus = useSelector(quizDetailStatusSelector);
  const { saved, bulkUpdate } = useSelector(questionsSavedSelector);

  const [questionId, setQuestionId] = useState(null); // este estado setea el id de la pregunta para filtrar y obtener el detalle y las

  const handleOnLeave = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (bulkUpdate && !saved) {
      dispatch(getAllQuestions(quizId));
    }
  }, [bulkUpdate]);

  useEffect(() => {
    dispatch(getAllQuestions(quizId));
    dispatch(getQuizDetailAsync(quizId));
    return () => {
      dispatch(ACTIONS.quizDetail.reset());
    };
  }, [dispatch, quizId]);

  useEffect(() => {
    if (!saved) window.addEventListener('beforeunload', handleOnLeave);
    if (saved) window.removeEventListener('beforeunload', handleOnLeave);
    //if(!saved){} //agregamos un valor de saved<boolean> en redux para determinar si el usuario grabo o no, en caso quie no si quiere navegar a otra  pagina, recargar, cerrar aparece un modal pidiendo que confirme cerrar o guardar todos los cambios
    return () => {
      window.removeEventListener('beforeunload', handleOnLeave);
    };
  }, [saved]);

  if (questionsStatus === 'pending' || quizDetailStatus === 'pending') {
    return <BackdropLoading />;
  } else if (questionsStatus === 'error' || quizDetailStatus === 'error') {
    return <h1>Ha ocurrido un error, recargue la pagina</h1>;
  } else if (questionsStatus === 'success' && quizDetailStatus === 'success') {
    const IDS = { questionId, quizId };
    return (
      <IdsContext.Provider value={IDS}>
        <Grid
          container
          spacing={5}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item sm={2}>
            <QuestionSideBar
              setQuestionId={setQuestionId}
              quizDetail={quizDetail}
              ref={formikRefs}
            />
          </Grid>
          <Grid
            container
            item
            sm={8}
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Questions ref={formikRefs} />
          </Grid>
        </Grid>
      </IdsContext.Provider>
    );
  }
  return null;
}

export default QuestionLoader;

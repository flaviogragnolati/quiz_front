import { convertFormikValuesToRedux } from 'utils/helpers';
import { updateQuestion } from 'views/QuizLoader/QuizLoaderSlice';

export const updateQuestionData = (ref, questionId, dispatch) => {
  const noop = () => null;

  //question Id error handling
  if (typeof questionId === 'undefined')
    throw new Error('no se recibio el parametro questionId');
  if (!questionId) return noop; //en caso que sea null, string vacio o 0

  //ref error handling
  if (typeof ref === 'undefined')
    throw new Error('No se ha recibido el arg ref');
  const { questionInfoRef, answersContentRef } = ref;
  const infoValues = questionInfoRef.current;
  const ansValues = answersContentRef.current;
  if (!infoValues && !ansValues) {
    console.error(
      'questionInfoRef.current & answersContentRef.current are not defined'
    );
    return noop;
  }
  console.log('info', infoValues && infoValues.values);
  console.log('ans', ansValues && ansValues.values);

  //actual update dispatch
  let questionData = {
    info: infoValues && infoValues.values,
    answers: ansValues && convertFormikValuesToRedux(ansValues.values),
    questionId,
  };

  dispatch(updateQuestion(questionData));
};

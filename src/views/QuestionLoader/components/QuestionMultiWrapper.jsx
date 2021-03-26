import React, { forwardRef, useContext, useEffect } from 'react';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import QuestionMulti from './QuestionMulti';
import { IdsContext } from '../QuestionLoader';
import { removeAnswer } from 'views/QuizLoader/QuizLoaderSlice';
import { useDispatch } from 'react-redux';

function QuestionMultiWrapper(props, ref) {
  const { answers } = props;
  const dispatch = useDispatch();
  let multiAnsContent;
  let initialValues = {};
  const { questionId } = useContext(IdsContext);

  useEffect(() => {
    answers.forEach((ans) => {
      initialValues[ans.id] = ans.text;
      const propName = `cCc${ans.id}`;
      initialValues[propName] = ans.correct;
    });
  }, [answers, initialValues]);

  const handleAnsDelete = (ansId) => {
    console.log('DELETING', ansId);
    dispatch(removeAnswer({ questionId, ansId }));
  };

  if (answers.length < 1) return null;
  else {
    multiAnsContent = answers.map((ans, idx) => {
      return (
        <QuestionMulti
          key={idx}
          questionNum={idx}
          answer={ans}
          deleteAns={handleAnsDelete}
          checked={ans.correct}
        />
      );
    });
  }
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      innerRef={(form) => (ref.current = form)}
    >
      <Form Style="display: contents;">{multiAnsContent}</Form>
    </Formik>
  );
}
QuestionMultiWrapper = forwardRef(QuestionMultiWrapper);
export default QuestionMultiWrapper;

QuestionMultiWrapper.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.object),
  handlers: PropTypes.objectOf(PropTypes.func).isRequired,
};

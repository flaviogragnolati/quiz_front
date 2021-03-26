import React, {
  forwardRef,
  useContext,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid} from '@material-ui/core';
import { Field, Form, Formik } from 'formik';
import { questionLoaderModel } from 'utils/forms/questionLoader';
import { useDispatch} from 'react-redux';
import { TextField } from 'formik-material-ui';
import { IdsContext } from '../QuestionLoader';
import { updateQuestionData } from 'views/QuestionLoader/components/questionHelpers';

const { title: titleModel, question: questionModel } = questionLoaderModel;

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  QuestionInfo__select: {
    minWidth: 100,
  },
}));

function QuestionInfo(props, ref) {
  const { title, question } = props;
  const dispatch = useDispatch();
  const { questionId } = useContext(IdsContext);

  const handleSubmit = () => {
    updateQuestionData(ref, questionId, dispatch);
  };

  const initialValues = {
    title,
    question,
  };
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      enableReinitialize={true}
      innerRef={(form) => (ref.current = form)}
    >
      <Form Style="display: contents;">
        <Grid item xs={5}>
          <Field
            name={titleModel.name}
            component={TextField}
            label={titleModel.label}
            fullWidth
          />
        </Grid>
        <Grid item xs={8}>
          <Field
            name={questionModel.name}
            component={TextField}
            label={questionModel.label}
            multiline
            fullWidth
            rowsMax={3}
          />
        </Grid>
      </Form>
    </Formik>
  );
}

QuestionInfo = forwardRef(QuestionInfo);

export default QuestionInfo;

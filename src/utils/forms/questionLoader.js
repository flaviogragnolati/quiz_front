import * as Yup from 'yup';

export const questionLoaderModel = {
  title: {
    name: 'title',
    label: 'Title*',
    requiredErrorMsg: 'Title is required',
    minErrorMsg: 'Title must be >2 chars',
  },
  question: {
    name: 'question',
    label: 'Question*',
    requiredErrorMsg: 'Question cannot be blank',
  },
};

const { title, question } = questionLoaderModel;

export const initialState_questionLoader = {
  [title.name]: '',
  [question.name]: '',
};

export const registerValidationSchema = Yup.object().shape({
  [title.name]: Yup.string()
    .required(`${title.requiredErrorMsg}`)
    .min(2, `${title.minErrorMsg}`),
  [question.name]: Yup.string()
    .required(`${question.requiredErrorMsg}`)
    .min(2, `${question.minErrorMsg}`),
});

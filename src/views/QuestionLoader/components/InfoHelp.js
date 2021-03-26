export const infoQuizModel = {
  title: {
    name: 'title',
    label: 'Titulo*',
    requiredErrorMsg: 'Titulo is required',
    minErrorMsg: 'Titulo must be >2 chars',
  },
  question: {
    name: 'question',
    label: 'Last name*',
    requiredErrorMsg: 'description is required',
    minErrorMsg: 'description must be >2 chars',
  },
};

const { title, question } = infoQuizModel;

export const initialState_Info = {
  [title.name]: '',
  [question.name]: '',
};

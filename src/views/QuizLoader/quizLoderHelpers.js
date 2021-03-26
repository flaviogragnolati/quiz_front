export const quizModel = {
  nameQuiz: {
    name: 'name',
    label: 'Nombre Quiz*',
    requiredErrorMsg: 'Nombre requerido',
    minErrorMsg: 'Nombre debe ser > 2 caracteres',
  },
  descripcion: {
    name: 'description',
    label: 'Descripcion*',
    requiredErrorMsg: 'Descripcion requerida',
  },
  tags: {
    name: 'tag',
    label: 'Tags*',
    requiredErrorMsg: 'Debe ingresar una categoria',
  },
  Logo: {
    name: 'logo',
    label: 'logo*',
    requiredErrorMsg: 'Logo is required',
    invalidadErrorMsg: 'Enter a valid Logo',
  },
  materia: {
    name: 'SubjectId',
    label: 'Materia*',
    requiredErrorMsg: 'Debe ingresar materia',
  },
};

const { nameQuiz, descripcion, tags, materia, Logo } = quizModel;

export const initialState_Quiz = {
  [nameQuiz.name]: '',
  [descripcion.name]: '',
  [tags.name]: '',
  [materia.name]: '',
  [Logo.name]:''
};

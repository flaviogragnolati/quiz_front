export const subjectModel = {
  name: {
    name: 'name',
    label: 'Nombre Materia*',
    requiredErrorMsg: 'Nombre requerido',
    minErrorMsg: 'Nombre debe ser > 2 caracteres',
  },
  description: {
    name: 'description',
    label: 'Descripcion*',
    requiredErrorMsg: 'Descripcion requerida',
  },
};

const { name, description} = subjectModel;

export const initialState_Subjects = {
  [name.name]: '',
  [description.name]: '',
};

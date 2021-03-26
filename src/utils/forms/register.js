import * as Yup from 'yup';

export const registerModel = {
  firstName: {
    name: 'firstName',
    label: 'Name*',
    requiredErrorMsg: 'Name is required',
    minErrorMsg: 'Name must be >2 chars',
  },
  lastName: {
    name: 'lastName',
    label: 'Last name*',
    requiredErrorMsg: 'Last Name is required',
    minErrorMsg: 'Last Name must be >2 chars',
  },
  email: {
    name: 'email',
    label: 'Email*',
    requiredErrorMsg: 'Email is required',
    invalidadErrorMsg: 'Enter a valid email',
  },

  password: {
    name: 'password',
    label: 'Password*',
    requiredErrorMsg: 'Pasword is required',
    minErrorMsg: 'Password must be >7 chars',
    maxErrorMsg: 'Password must be <21 chars',
    imvalidadErrorMsg:
      'Password must container uppercase, number and special char',
  },
  cellphone: {
    name: 'cellphone',
    label: 'Cellphone number*',
    imvalidadErrorMsg: 'Cellphone must contain only numbers',
  },
  birthdate: {
    name: 'birthdate',
    label: 'Birthdate',
    requiredErrorMsg: 'Birthdate is required',
    invalidErrorMsg: 'Enter a valid birthdate',
  },
};

const {
  firstName,
  lastName,
  email,
  password,
  cellphone,
  birthdate,
} = registerModel;

export const initialState_Register = {
  [firstName.name]: '',
  [lastName.name]: '',
  [email.name]: '',
  [password.name]: '',
  [cellphone.name]: '',
  [birthdate.name]: '',
};

export const registerValidationSchema = Yup.object().shape({
  [firstName.name]: Yup.string()
    .required(`${firstName.requiredErrorMsg}`)
    .min(2, `${firstName.minErrorMsg}`),
  [lastName.name]: Yup.string()
    .required(`${lastName.requiredErrorMsg}`)
    .min(2, `${lastName.minErrorMsg}`),
  [email.name]: Yup.string()
    .email(`${email.invalidErrorMsg}`)
    .required(`${email.requiredErrorMsg}`),
  [password.name]: Yup.string()
    .min(8, password.minErrorMsg)
    .max(20, password.maxErrorMsg)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      password.invalidErrorMsg
    )
    .required(password.requiredErrorMsg),
  [birthdate.name]: Yup.string().required(`${birthdate.requiredErrorMsg}`),
});

export const initialState_Login = {
  [email.name]: '',
  [password.name]: '',
};

export const loginValidationSchema = Yup.object().shape({
  [email.name]: Yup.string()
    .email(`${email.invalidErrorMsg}`)
    .required(`${email.requiredErrorMsg}`),
});

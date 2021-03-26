import authSlice from 'components/Auth/authSlice';
import actionsSlice from 'slices/actionsSlice';
import catalogueSlice from 'views/Catalogue/catalogueSlice';
import notificationSlice from 'views/Notifier/notificationSlice';
import QuizLoaderSlice from 'views/QuizLoader/QuizLoaderSlice';
import profileSlice from 'views/Profiles/profileSlice';
import SchoolSlice from 'views/School/SchoolSlice';
import TeacherSlice from 'views/Teacher/TeacherSlice';
import quizDetailSlice from 'views/QuizProfile/quizDetailSlice';

// import UserRegisterSlice from 'views/Register/registerSlice';

const rootReducer = {
  notifications: notificationSlice.reducer,
  actions: actionsSlice.reducer,
  auth: authSlice.reducer,
  catalogue: catalogueSlice.reducer,
  quizDetail: quizDetailSlice.reducer,
  profile: profileSlice.reducer,
  QuizLoader: QuizLoaderSlice.reducer,
  School: SchoolSlice.reducer,
  Teacher: TeacherSlice.reducer,
};

export default rootReducer;

export const ACTIONS = {
  notifications: { ...notificationSlice.actions },
  actions: { ...actionsSlice.actions },
  auth: { ...authSlice.actions },
  catalogue: { ...catalogueSlice.actions },
  quizDetail: { ...quizDetailSlice.actions },
  quizLoader : {...QuizLoaderSlice.actions},
  School: { ...SchoolSlice.actions },
};

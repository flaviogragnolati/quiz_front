import { Route, Switch } from 'react-router-dom';
import OnlyGuestRoute from 'components/Auth/OnlyGuestRoute';
import Home from 'views/Home';
import Login from 'views/Login/Login';
import NotFound from 'views/NotFound';
import MyProfile from 'views/Profiles/MyProfile';
import UserProfile from 'views/Profiles/UserProfile';
import SchoolProfile from 'views/Profiles/SchoolProfile';
import QuizProfile from 'views/QuizProfile';
import Catalogue from 'views/Catalogue';
import Register from 'views/Register/Register';
import SchoolSubject from 'views/School/SchoolSubject';
import About from 'views/About/';
import SchoolQuiz from 'views/School/SchoolQuiz';
import RegisterSchool from 'views/Register/RegisterSchool';
import QuestionLoader from 'views/QuestionLoader';
import DatosQuiz from 'views/QuizLoader/DatosQuiz';
import SubjectLoader from 'views/School/SubjectLoader';
import LoginSchool from 'views/Login/LoginSchool';
import QuizTeacher from 'views/Teacher/QuizTeacher';
import EnrollTeacher from 'views/Teacher/EnrollTeacher';
import TeachersQuiz from 'views/School/TeachersQuiz';
import Teacher from 'components/ProfileDetail/Profiles/Teacher';
import TeacherRoute from 'components/Auth/TeacherRoute';
import UserRoute from 'components/Auth/UserRoute';
import SchoolRoute from 'components/Auth/SchoolRoute';
import PublicRoute from 'components/Auth/PublicRoute';
import AdminRoute from 'components/Auth/AdminRoute';
import UserSchoolRoute from 'components/Auth/UserSchoolRoute';
import QandA from 'views/QandA';



/**
 * !Definicion de `roles` y niveles de acceso:
 * ?public: Puede acceder cualquier usuario a esta ruta, inclusive un guest (ej. /catalogue)
 * ?onlyGuest: Solo pueden acceder los usuarios/schools NO logeados (ej. /login)
 * ?user: Es necesario estar logeado para poder acceder, pudiendo ser student o teacher.
 * ?en caso de ser teacher se muestra la info correspondiente
 * ?teacher: Es necesario estar logeado como user y ademas tener el rol de teacher
 * ?school: Es necesario estar logeado y ser una `school` para poder acceder a la ruta
 * ?admin: Es necesario estar logeado y ser un usuario tipo `admin`
 *
 * *Pasar los niveles de acceso como strings o array de strings para definir varios niveles,
 * !OJO: los niveles de acceso no pueden ser mutuamente excluyentes (ej.: ['onlyGuest','user'])
 * *['guest'|'onlyGuest'|'user'|'teacher'|'school'|'admin',...]
 */
export const routes = [
  { path: ['/', '/home'], component: Home, access: 'public', exact: true },
  { path: '/login', component: Login, access: 'onlyGuest' },
  { path: '/register', component: Register, access: 'onlyGuest' },
  { path: '/loginSchool', component: LoginSchool, access: 'onlyGuest' },
  { path: '/about', component: About, access: 'public' },
  { path: '/registerSchool', component: RegisterSchool, access: 'onlyGuest' },
  { path: '/quiz-loader/', component: DatosQuiz, access: 'school' },
  { path: '/QandA/', component: QandA, access: 'public' },
  {
    path: ['/subject-loader/:id', '/subject-loader'],
    component: SubjectLoader,
    access: 'school',
  },
  {
    path: '/question-loader/:id',
    component: QuestionLoader,
    access: 'user-school',
  },
  { path: '/edit/profile', component: Teacher, access: 'user' },
  { path: '/profile/:id', component: UserProfile, access: 'public' },
  {
    path: '/myprofile',
    component: MyProfile,
    access: 'user-school',
  },
  {
    path: '/catalogue',
    component: Catalogue,
    access: 'public',
  },
  { path: '/school-profile/:id', component: SchoolProfile, access: 'public' },
  { path: '/quiz-detail/:id', component: QuizProfile, access: 'public' },
  { path: '/school-subject', component: SchoolSubject, access: 'school' },
  { path: '/quiz-teacher', component: TeachersQuiz, access: 'school' },
  { path: '/school-quiz', component: SchoolQuiz, access: 'school' },
  { path: '/quiz-list', component: QuizTeacher, access: 'user-school' },
  {
    path: '/enroll-list/:id',
    component: EnrollTeacher,
    access: 'user-school',
  },
  // { path: '/teacher-dashboard', component: TeacherDashboard, access: 'tea' },
  { path: '/404', component: NotFound, access: 'public' },
];

export const createRoutes = (routes) => {
  if (routes.length < 1) return null;
  return (
    <Switch>
      {routes.map((route, idx) => {
        if (routes.length === idx + 1) {
          return <Route component={NotFound} />;
          // return <Redirect to="/404" />;
        }
        switch (route.access) {
          case 'public':
            return (
              <PublicRoute
                key={route.path + idx}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            );
          case 'onlyGuest':
            return (
              <OnlyGuestRoute
                key={route.path + idx}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            );
          case 'user':
            return (
              <UserRoute
                key={route.path + idx}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            );
          case 'teacher':
            return (
              <TeacherRoute
                key={route.path + idx}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            );
          case 'school':
            return (
              <SchoolRoute
                key={route.path + idx}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            );
          case 'user-school':
            return (
              <UserSchoolRoute
                key={route.path + idx}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            );
          case 'admin':
            return (
              <AdminRoute
                key={route.path + idx}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            );

          default:
            console.error('ACCESS LEVEL NOT DEFINED');
            return (
              <Route
                key={route.path + idx}
                path={route.path}
                component={route.component}
                exact={route.exact}
              />
            );
        }
      })}
    </Switch>
  );
};

//General or Global selectors
export const notificationSelector = (state) => state.notifications.list;

//Auth and User selectors
export const userSelector = (state) => state.auth.user;
export const authStatusSelector = (state) => state.auth.status;
export const tokenSelector = (state) => state.auth.token;
export const restoreSessionSelector = (state) => state.auth.restore;

//Quiz selectors
export const QuizSchoolSelector = (state) => state.QuizInfo.QuizSchool;
export const QuizSchoolStatusSelector = (state) => state.QuizInfo.status;

//Catalogue Selectors
export const catalogueStatusSelector = (state) => state.catalogue.status;
export const catalogueEntitiesSelector = (state) => state.catalogue.entities;
export const catalogueResultSelector = (state, filter) => {
  if (filter) return state.catalogue.filteredResult;
  else return state.catalogue.result;
};
export const totalCatalogueSelector = (state) => state.catalogue.total;
export const forceCatalogueSelector = (state) => state.catalogue.force;
export const quizzesSelector = (state) => state.catalogue.entities.quizzes;
export const quizTagsSelector = (state) => state.catalogue.entities.quizTags;
export const reviewsSelector = (state) => state.catalogue.entities.reviews;
export const schoolsSelector = (state) => state.catalogue.entities.schools;
export const subjectsSelector = (state) => state.catalogue.entities.subjects;
export const catalogueFilterSelector = (state) => state.catalogue.filter;

export const catalogueAllQuizzesIdsSelector = (state) =>
  state.catalogue.allQuizzesIds;

//Quiz Detail Selectors
export const quizDetailStatusSelector = (state) => state.quizDetail.status;
export const quizDetailSelector = (state, id) => state.quizDetail.detail[id];
export const quizDetailHistorySelector = (state) => state.quizDetail.idHistory;
// export const selectQuizDetailById = createSelector(
//   [
//     quizzesSelector,
//     quizTagsSelector,
//     reviewsSelector,
//     schoolsSelector,
//     subjectsSelector,
//     (_, id) => id,
//   ],
//   (quizzes, tags, reviews, schools, subjects, id) => {
//     let quizDetail = { ...quizzes[id] };
//     //chequeamos que los campos que pueden ser nulos, y deberian devolver un array, no sean nulos, en ese caso le asignamos un array vacio
//     //en caso de no recibir un array, lo casteamos a array
//     if (quizDetail.Reviews == null) {
//       quizDetail.Reviews = [];
//     } else {
//       console.log(quizDetail);
//       quizDetail.Reviews = Array.isArray(quizDetail.Reviews)
//         ? quizDetail.Reviews
//         : [quizDetail.Reviews];
//     }

//     if (quizDetail.QuizTags == null) {
//       quizDetail.QuizTags = [];
//     } else {
//       quizDetail.QuizTags = Array.isArray(quizDetail.QuizTags)
//         ? quizDetail.QuizTags
//         : [quizDetail.QuizTags];
//     }

//     const subjectInfo = subjects[quizDetail.Subject];
//     const schoolInfo = schools[quizDetail.School];
//     const reviewsInfo = quizDetail.Reviews.map((reviewId) => reviews[reviewId]);
//     const quizTagsInfo = quizDetail.QuizTags.map((quizId) => tags[quizId]);

//     quizDetail.Subject = subjectInfo;
//     quizDetail.School = schoolInfo;
//     quizDetail.Reviews = reviewsInfo;
//     quizDetail.QuizTags = quizTagsInfo;

//     return quizDetail;
//   }
// );

//Profile selectors
export const userProfileSelector = (state) => state.profile.user;
export const schoolProfileSelector = (state) => state.profile.school;
export const profileStatusSelector = (state) => state.profile.status;
export const userQuizSelector = (state) => state.profile.userEnrroledIn;
export const userQuizFavouritesSelector = (state) =>
  state.profile.userQuizFavourites;

//School selectors

// export const SchoolSubjectDetailSelector = (state) =>state.School.SchoolSubjectList.SubjectDetail;
export const SchoolQuizSelector = (state) => state.School.SchoolQuizList;
export const schoolSubjectErrorSelector = (state) =>
  state.School.SchoolSubjectList.error;
export const SchoolTeachersSelector = (state) => state.School.SchoolTeacherList;
export const SchoolStatusSelector = (state) => state.School.status;
export const SchoolSubjectSelector = (state) =>
  state.School.SchoolSubjectList.SubjectList;
export const SchoolSubjectStatusSelector = (state) =>
  state.School.SchoolSubjectList.status;
export const UserDetailSelector = (state) => state.School.UserDetail.data;
export const UserRoleSelector = (state) => state.School.UserDetail.role;
export const UserDetailStatusSelector = (state) =>
  state.School.UserDetail.status;

//Quiz selector
export const QuestionsSelector = (state, id) => {
  if (!id) return state.QuizLoader.questions;
  else return state.QuizLoader.questions.find(({ id: qId }) => id === qId);
};
export const questionAnswersSelector = (state, id) => {
  return state.QuizLoader.questions.find(({ id: qId }) => id === qId).Answers;
};
export const questionsSavedSelector = (state) => {
  return {
    saved: state.QuizLoader.saved,
    bulkUpdate: state.QuizLoader.bulkUpdate,
  };
};
export const QuestionStatusSelector = (state) => state.QuizLoader.status;

//Teacher selectors
export const TeacherQuizSelector = (state) => state.Teacher.TeacherQuizList;
export const TeacherQuizStatusSelector = (state) => state.Teacher.status;
export const TeacherEnrollSelector = (state) => state.Teacher.TeacherUserList;
export const TeacherEnrollStatusSelector = (state) => state.Teacher.status;

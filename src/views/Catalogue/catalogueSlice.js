import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { COUNT_QUIZ_ENDPOINT } from 'utils/endpoints';
import { QUIZ_ENDPOINT } from 'utils/endpoints';
import { status } from 'utils/helpers';

const initialState_Catalogue = {
  status: status.idle,
  entities: {},
  result: '',
  allQuizzesIds: '',
  total: '',
  force: false,
  filter: false,
  filteredResult: '',
};

export const getCatalogue = createAsyncThunk(
  'catalogue/getCatalogue',
  async (payload, thunkApi) => {
    const { page, pageSize } = payload;
    const catalogue_response = await axios.get(QUIZ_ENDPOINT, {
      params: { page, pageSize },
    });
    console.log('cat response', catalogue_response);
    const totalQuizzes = await axios.get(COUNT_QUIZ_ENDPOINT);
    const returnPayload = {
      ...catalogue_response.data,
      total: totalQuizzes.data,
    };
    return returnPayload;
  },
  {
    condition: (payload, { getState }) => {
      const { catalogue } = getState();
      if (
        catalogue.status === status.pending ||
        catalogue.status === status.loading ||
        catalogue.status === status.error
      ) {
        return false;
      }
    },
  }
);

const catalogueSlice = createSlice({
  name: 'catalogue',
  initialState: initialState_Catalogue,
  reducers: {
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
    filter: (state, { payload }) => {
      let filteredCatalogue = [];

      const { school, subject, quiz, tag } = payload;
      //traemos los arrays de cada filterGroup
      let schoolResult =
        school && school.length && school.map((school) => school.id);
      let subjectResult =
        subject && subject.length && subject.map((subject) => subject.id);
      let quizResult = quiz && quiz.length && quiz.map((quiz) => quiz.id);
      let tagResult = tag && tag.length && tag.map((tag) => tag.id);
      state.result.forEach((id, idx) => {
        let entity = state.entities.quizzes[id];
        if (
          (schoolResult && schoolResult.includes(entity.School)) ||
          (subjectResult && subjectResult.includes(entity.Subject)) ||
          (quizResult && quizResult.includes(entity.id))
        ) {
          filteredCatalogue.push(id);
        }
        let quizTags = Array.isArray(entity.QuizTags)
          ? entity.QuizTags
          : [entity.QuizTags];
        if (!!entity.QuizTags && tagResult) {
          tagResult.forEach((tagId) => {
            if (quizTags.includes(tagId)) {
              filteredCatalogue.push(id);
            }
          });
        }
      });
      console.log(filteredCatalogue);
      state.filteredResult = [...new Set(filteredCatalogue)];
    },
    clearFilter: (state, { payload }) => {
      state.filter = false;
    },
  },
  extraReducers: {
    [getCatalogue.pending]: (state, { payload }) => {
      state.status = status.pending;
    },
    [getCatalogue.fulfilled]: (state, { payload }) => {
      state.status = status.success;
      state.allQuizzesIds = payload.allQuizzesIds;
      const entities = payload.entities;
      Object.keys(entities).forEach((entity) => {
        if (Object.keys(entities[entity])[0] === 'null') {
          return;
        }
        state.entities[entity] = {
          ...state.entities[entity],
          ...entities[entity],
        };
      });
      state.result = [
        ...state.result,
        ...[...new Set(payload.result)].sort((a, b) => a - b),
      ];
      if (state.total !== payload.total) {
        state.total = payload.total;
      }
      if (typeof state.total === 'number' && state.total !== payload.total)
        state.force = true;
    },
    [getCatalogue.rejected]: (state, { payload }) => {
      state.status = status.error;
    },
  },
});

export default catalogueSlice;

import React from 'react';
import ComboFilter from './ComboFilter';
import { useSelector } from 'react-redux';
import { quizTagsSelector, quizzesSelector } from 'utils/selectors';
import { formatStateToOptions } from 'utils/helpers';

function SchoolFilterDetail({ setFilter, clear }) {
  const quizTags = useSelector(quizTagsSelector);
  const quizzes = useSelector(quizzesSelector);
  const quizTagsOptions = formatStateToOptions(quizTags);
  const quizzesOptions = formatStateToOptions(quizzes);
  return (
    <>
      <ComboFilter
        label="Quiz Name"
        placeholder="Nombre del Quiz"
        name="quiz"
        options={quizzesOptions || [{ id: '', label: 'NO DATA' }]}
        setFilter={setFilter}
        clear = {clear}
      />
      <br></br>
      <ComboFilter
        label="Quiz Tags"
        placeholder="Tags del Quiz"
        name="tag"
        options={quizTagsOptions || [{ id: '', label: 'NO DATA' }]}
        setFilter={setFilter}
        clear={clear}
      />
    </>
  );
}

export default SchoolFilterDetail;

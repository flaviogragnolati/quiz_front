import React  from 'react';
import ComboFilter from './ComboFilter';
import { useSelector } from 'react-redux';
import { subjectsSelector } from 'utils/selectors';
import { formatStateToOptions } from 'utils/helpers';

function SubjectFilterDetail({ setFilter, clear }) {
  const subjects = useSelector(subjectsSelector);
  const subjectOptions = formatStateToOptions(subjects);



  return (
    <>
      <ComboFilter
        name="subject"
        label="Materia"
        placeholder="Subject Name"
        options={subjectOptions || [{ id: '', label: 'NO DATA' }]}
        setFilter={setFilter}
        clear={clear}
      />
    </>
  );
}

export default SubjectFilterDetail;

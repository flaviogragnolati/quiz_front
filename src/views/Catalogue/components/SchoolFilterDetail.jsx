import React from 'react';
import { formatStateToOptions } from 'utils/helpers';
import ComboFilter from './ComboFilter';
import CountryFilter from './CountryFilter';
import { useSelector } from 'react-redux';
import { schoolsSelector } from 'utils/selectors';

function SchoolFilterDetail({ setFilter, values , clear}) {
  const schools = useSelector(schoolsSelector);
  const schoolOptions = formatStateToOptions(schools);


  return (
    <>
      <ComboFilter
        label="Nombre de la Escuela"
        placeholder="School Name"
        options={schoolOptions || [{ id: '', label: 'NO DATA' }]}
        values={values}
        clear={clear}
        setFilter={setFilter}
        name="school"
      />
      <br></br>
      <CountryFilter clear={clear} label="Pais" placeholder="Country" />
    </>
  );
}

export default SchoolFilterDetail;

/* eslint-disable no-use-before-define */
import React, { useEffect,useRef } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { PropTypes } from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { catalogueFilterSelector } from 'utils/selectors';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function ComboFilter({
  label,
  placeholder,
  options,
  limitTags,
  name,
  clear,
  setFilter,
  values: propValues,
}) {
  const classes = useStyles();
  const [values, setValues] = useState(propValues);
  const filter = useSelector(catalogueFilterSelector);
  const autoC = useRef(null);
  const handleChange = (e, newValue) => {
    const nameSpace = e.target.id.split('-')[0];
    setFilter((oldValues) => {
      return { ...oldValues, [nameSpace]: newValue };
    });
    setValues(newValue);
  };
  useEffect(()=>{
    if(!filter && clear){
      let borrar = autoC.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0]
      borrar.click()
    }

  },[clear])

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        filterSelectedOptions
        limitTags={limitTags || 2}
        id={name}
        options={options}
        getOptionLabel={(option) => option.label}
        value={values}
        ref={autoC}
        onChange={(event, newValue) => handleChange(event, newValue)}
        renderInput={(params) => (
          
          <TextField
            {...params}
            variant="outlined"
            label={label}
            placeholder={placeholder}
          />
        )}
      />
    </div>
  );
}

ComboFilter.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  limitTags: PropTypes.number,
  options: PropTypes.object.isRequired,
  defaultValue: PropTypes.object,
};

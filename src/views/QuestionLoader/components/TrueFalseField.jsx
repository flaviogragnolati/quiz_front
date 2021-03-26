import React from 'react';
import { useState, useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { PropTypes } from 'prop-types';
import { useField, useFormikContext } from 'formik';
import styled from 'styled-components';

const HiddenCheck = styled.input`
  display: none;
`;
function TrueFalseField({ name, ...rest }) {
  const [field, meta,helpers] = useField({ name, type: 'checkbox' });
  const { values } = useFormikContext();

  const [correct, setCorrect] = useState(false);

  useEffect(() => {
      setCorrect(values[name]);
  }, [values, name,correct]);

  
  const handleClick = () => {
    setCorrect((prevState) => {
      helpers.setValue(!prevState, false);
      return !prevState;
    });
  };
  if(typeof correct !== 'boolean'){
    console.log('Cargando..???')
   return  <h1>cargando..</h1>
  }else{

    return (
      <>
        <HiddenCheck name={name} type="checkbox" {...field} {...rest} />
        <IconButton edge="start" color="inherit" onClick={handleClick}>
          {correct ? (
            <CheckCircleIcon style={{ color: 'green' }} {...rest} />
          ) : (
            <CancelIcon style={{ color: 'red' }} {...rest} />
          )}
        </IconButton>
      </>
    );
  }
}

TrueFalseField.propTypes = {
  action: PropTypes.func,
};

export default TrueFalseField;

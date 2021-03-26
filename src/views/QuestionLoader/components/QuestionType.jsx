import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';

function QuestionType({ setMulti }) {
  const handleQuestionType = (e) => {
    if (e.target.value === 1) {
      setMulti(1);
    } else if (e.target.value === 2) {
      setMulti(2);
    }
  };
  return (
    <FormControl>
      <InputLabel>Tipo de pregunta</InputLabel>
      <Select onChange={(e) => handleQuestionType(e)}>
        <MenuItem value={1}>Multiple Opcion</MenuItem>
        <MenuItem value={2}>Verdadero o Falso</MenuItem>
      </Select>
      <FormHelperText>Elige el tipo de pregunta que deseas</FormHelperText>
    </FormControl>
  );
}

export default QuestionType;

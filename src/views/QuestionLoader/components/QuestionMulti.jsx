import React from 'react';
import {
  Box,
  Grid,
  IconButton,
  //   makeStyles,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import TrueFalseField from './TrueFalseField';

function QuestionMulti({
  answer: { id },
  questionNum,
  deleteAns,
}) {
  return (
    <>
      <Grid item md={8} xs={12}>
        <Field
          name={id}
          label={`Pregunta #${questionNum + 1}`}
          variant="outlined"
          component={TextField}
          fullWidth
        />
      </Grid>
      <Grid item md={4} xs={12}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          marginLeft="1rem"
        >
          <TrueFalseField fontSize="large" name={`cCc${id}`} />
          <IconButton
            color="secondary"
            aria-label="delete answer"
            component="span"
            size="large"
            onClick={() => deleteAns(id)}
          >
            <DeleteIcon fontSize="large" />
          </IconButton>
        </Box>
      </Grid>
    </>
  );
}

export default QuestionMulti;

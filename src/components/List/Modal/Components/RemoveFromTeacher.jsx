import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from "@material-ui/core";
import {  useSelector } from "react-redux";
import { UserDetailSelector } from "utils/selectors";



const useStyles = makeStyles(() => ({
  field: {
    padding: "20px",
    fontSize: "16px",
    borderRadius: "3px",
    margin: "15px",
    minWidth: "25vh",
  },
  root: {
    minWidth: "30vh",
    minHeight: "30vh",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    border: "3px solid black",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  photo: {
    maxHeight: "20vh",
  },
  user_data: {
    margin: "3vh 3vh 0vh 3vh",
  },
  button: {
    margin: "1vh",
  },
  isTeacher: {
    maxWidth: "20vh",
    margin: "2vh",
    fontWeight: "bold",
  },
}));

function RemoveFromTeacher() {
  const classes = useStyles();
  const UserDetail = useSelector(UserDetailSelector);


  return (
<>
      <Grid className={classes.user_data} xs={12}>
        <img className={classes.photo} src={UserDetail.photo} alt='teacher'/>
        <Typography variant="button" display="block">
          {`${UserDetail.firstName} ${UserDetail.lastName}`}
        </Typography>
      </Grid>
      <Grid xs={12}>
          <hr></hr>
      <Typography
          className={classes.isTeacher}
          variant="button"
          display="block"
        >
          Este Usuario es Profesor en este Quiz
        </Typography>
        <Typography
          className={classes.isTeacher}
          variant="button"
          display="block"
        >
          Deseas quitarle el rol de Profesor?
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Grid xs={12}>
          <Button
            className={classes.button}
            color="primary"
            variant="contained"
            type="submit"
          >
            Remover profesor
          </Button>
        </Grid>
      </Grid>
</>
  );
}

export default RemoveFromTeacher;

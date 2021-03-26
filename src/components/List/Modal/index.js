import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Form, Formik } from "formik";
import {  Card, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  UserDetailSelector,
  UserDetailStatusSelector,
  UserRoleSelector,
} from "utils/selectors";
import {
  getUserEmail,
  cleanUser,
  postUserToTeacher,
  removeTeacher,
} from "views/School/SchoolSlice";
import SearchUser from "components/List/Modal/Components/SearchUser";
import PromoteToTeacher from "components/List/Modal/Components/PromoteToTeacher";
import RemoveFromTeacher from "components/List/Modal/Components/RemoveFromTeacher";
import CancelPresentationIcon from "@material-ui/icons/CancelPresentation";


const useStyles = makeStyles((theme) => ({
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
  closeIcon: {
    width: '100%',
    textAlign: 'end',
    padding: '2px',
  },
}));
function ModalTeacher({ Id, open, setOpen }) {
  const classes = useStyles();
  const Dispatch = useDispatch();
  const UserDetail = useSelector(UserDetailSelector);
  const role = useSelector(UserRoleSelector);
  const status = useSelector(UserDetailStatusSelector);


  const handleClose = () => {
    setOpen(false);
    Dispatch(cleanUser());
  };
  const handleSubmit = (values) => {
    if (status === "idle" || status === "error") {
      values.Id = Id;
      Dispatch(getUserEmail(values));
    }
    if (
      (status === "success" && !role) ||
      (status === "success" && role && role.name !== "Teacher")
    ) {
      Dispatch(postUserToTeacher({ QuizId: Id, UserId: UserDetail.id }));
    }
    if (status === "success" && role && role.name === "Teacher") {
      Dispatch(removeTeacher({ QuizId: Id, UserId: UserDetail.id }));
    }
  };
  
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      BackdropComponent={Backdrop}
      BackdropProps={{}}
    >
      <Fade in={open}>
        <Formik onSubmit={handleSubmit} initialValues={{ email: "" }}>
          {(formik) => (
            <Form Style="display: contents;">
              <Card className={classes.root}>
                <div className={classes.closeIcon}  >
                  <IconButton  onClick={handleClose}>
                  <CancelPresentationIcon />
                  </IconButton >
                </div>
                <div>
                {status === "idle" || status === "error" ? (
                  <SearchUser />
                ) : status === "success" && role && role.name === "Teacher" ? (
                  <RemoveFromTeacher />
                ) : status === "success" ? (
                  <PromoteToTeacher />
                ) : null}
                </div>
              </Card>
            </Form>
          )}
        </Formik>
      </Fade>
    </Modal>
  );
}

export default ModalTeacher;

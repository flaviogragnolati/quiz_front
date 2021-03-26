import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Teacher from 'components/ProfileDetail/Profiles/Teacher';
import School from 'components/ProfileDetail/Profiles/School';
import Quizz from 'components/ProfileDetail/Profiles/Quizz';
import {
  Box,
  Button,
  Card,
  Divider,
  makeStyles
} from '@material-ui/core';



const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, profile, ...rest }) => {
  const classes = useStyles();

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        {profile === 'teacher' ? <Teacher /> : profile === 'school' ? <School /> : profile === 'quizz' ? <Quizz /> : null}
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Save detailss
          </Button>
        </Box>
      </Card>
    </form>

  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
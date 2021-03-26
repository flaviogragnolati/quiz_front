import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Parallax from "components/Parallax/Parallax.js";
import styled from "styled-components";
import {
  Button,
  Typography,
  Box,
  Grid,
  Chip,
  Tooltip,
  Zoom,
} from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import SchoolIcon from "@material-ui/icons/School";
import { Rating } from "@material-ui/lab";
import EmailIcon from "@material-ui/icons/Email";
import { useDispatch, useSelector } from "react-redux";
import { quizDetailStatusSelector } from "utils/selectors";
import { quizDetailSelector } from "utils/selectors";
import { getQuizDetailAsync } from "views/QuizProfile/quizDetailSlice";
import { enrollUser } from "views/Teacher/TeacherSlice";
import BackdropLoading from "components/Loading/BackdropLoading";
import { quizDetailHistorySelector } from "utils/selectors";
import { userSelector } from "utils/selectors";

import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

const schoolImg =
  "https://media.glassdoor.com/l/0d/b2/15/11/beautiful-campus.jpg";

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 0.35fr) minmax(400px, 1fr) minmax(
      min-content,
      0.25fr
    );
  grid-template-rows:
    minmax(5rem, 0.25fr) minmax(7rem, 0.25fr) minmax(7rem, 0.2fr) minmax(
      12rem,
      auto
    )
    auto auto;
  grid-gap: 0.2rem;
  grid-template-areas:
    ". school school"
    "picture quiz date"
    "picture description teacher"
    "picture description contactinfo"
    "reviews  . ."
    "reviews  . actions";
  /* align-items: stretch;
  justify-items: stretch; */
  /* justify-content: stretch;
  align-content: end; */
  position: relative;
  z-index: auto;
  margin: 0vh 5vw 0;
  padding: 2rem;
  border-radius: 6px;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14),
    0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
`;

const Picture = styled.img`
  grid-area: picture;
  align-self: center;
  justify-self: center;
  margin-right: 1vw;
  width: 100%;
  border: 1px solid #7b7b7b9c;
  /* object-fit: cover; */
  background-size: contain;
  background-position: center;
  /* border-color: red;
  border-radius: 4px;
  border-style: solid; */
`;

const QuizName = styled.div`
  grid-area: quiz;
  align-self: center;
  justify-self: center;
  height: 100%;
  width: 100%;
`;

const School = styled.div`
  grid-area: school;
  align-self: center;
  justify-self: left;
  height: 0%;
  width: 100%;
  color: ${(p) => p.theme.palette.primary.contrastText};
`;
const Reviews = styled.div`
  grid-area: reviews;
  /* align-self: center;
  justify-self: center; */
  height: 100%;
  width: 100%;
  /* border-color: red;
  border-width: 5px;
  border-style: solid;
  background-color: ${(p) => p.theme.main}; */
`;
const Description = styled.div`
  grid-area: description;
  align-self: center;
  justify-self: center;
  height: 100%;
  width: 100%;
  padding: 0.2rem;
  overflow: scroll;
`;

const DateOpen = styled.div`
  grid-area: date;
  font-weight: bolder;
  align-self: center;
`;
const ContactInfo = styled.div`
  grid-area: contactinfo;
  align-self: center;
  justify-self: center;
  height: 100%;
  width: 100%;
`;
const Actions = styled.div`
  grid-area: actions;
  align-self: flex-end;
  justify-self: center;
  height: 100%;
  width: 100%;
`;

const ShadowBox = styled(Box)`
  /* display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-self: center;
  flex-grow: 1;
  background-color: gray; */
  margin: 1rem;
  padding: 0.2rem;
  border-radius: 10px;
  box-shadow: 0 5px 5px -8px rgba(0, 0, 0, 0.24),
    0 8px 10px -5px rgba(0, 0, 0, 0.2);
`;

const CleanLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  &:hover {
    color: ${(p) => p.theme.palette.primary.main};
  }
`;

const handleClick = () => {
  console.info("Accessing the profile of the user that made the review");
};

function QuizProfile(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  const quizDetailStatus = useSelector(quizDetailStatusSelector);
  const quizDetail = useSelector((state) => quizDetailSelector(state, id));
  const quizDetailHistory = useSelector(quizDetailHistorySelector);
  const user = useSelector(userSelector);

  const handleEnroll = () => {
    dispatch(enrollUser({ UserId: user.id, QuizId: quizDetail.id }));
  };

  useEffect(() => {
    if (!quizDetailHistory.includes(parseInt(id))) {
      dispatch(getQuizDetailAsync(id));
    }
  }, [dispatch, quizDetailStatus, quizDetailHistory, id]);

  if (quizDetailStatus === "pending") {
    return <BackdropLoading />;
  } else if (quizDetailStatus === "error") {
    return <h1>Ha ocurrido un error metele F5</h1>;
  } else if (quizDetailStatus === "success" && !!quizDetail) {
    var {
      name,
      quantity,
      description,
      Subject: { name: subjectName },
      School: {
        name: schoolName,
        email: schoolEmail,
        city: schoolCity,
        country: schoolCountry,
        id: schoolId,
      },
      Reviews: reviewList,
      logo,
      active,
    } = quizDetail;
  }

  return (
    <div>
      <Parallax small filter image={schoolImg} />
      <MainContainer>
        <Picture src={logo} />
        <QuizName>
          <ShadowBox>
            <Typography variant="h3" color="secondary">
              {name}
            </Typography>
            <Typography variant="subtitle1" color="secondary">
              {subjectName}
            </Typography>
          </ShadowBox>
        </QuizName>
        <School>
          <Box display="flex" flexDirection="row" justifyContent="left">
            <Typography
              Style="color: grey;font-weight: inherit;"
              variant="h2"
              gutterBottom
              paragraph
              color="contrastText"
              component={CleanLink}
              to={`/school-profile/${schoolId}`}
            >
              <Box marginLeft="0.1rem" marginRight="1rem" display="inline-flex">
                <SchoolIcon color="secondary" fontSize="large" />
              </Box>
              {schoolName}
            </Typography>
          </Box>
        </School>
        <Reviews>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            padding="0.2rem"
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="left"
              padding="0.2rem"
            >
              <Tooltip
                TransitionComponent={Zoom}
                title="Students Enrolled"
                placement="left"
              >
                <span>
                  <Button disabled>
                    <PeopleIcon color="secondary" />
                    <Typography
                      color="secondary"
                      display="inline"
                      variant="body2"
                    >
                      {quantity && quantity}
                    </Typography>
                  </Button>
                </span>
              </Tooltip>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="right"
              padding="0.2rem"
            >
              <Typography variant="subtitle1">Score</Typography>
              <Typography variant="body1">
                <Rating name="score" value={8} readOnly />
              </Typography>
            </Box>
          </Box>
          <Grid spacing={2}>
            {reviewList &&
              reviewList.slice(0, 3).map((review, idx) => {
                return (
                  <>
                    <Grid item>
                      <Typography variant="body1">
                        Student:{" "}
                        <Link
                          to={{
                            pathname: `/profile/${review.UserId}`,
                            state: {
                              owner: false,
                            },
                          }}
                        >
                          <Chip
                            label={review.UserId}
                            variant="outlined"
                            color="info"
                            size="small"
                            onClick={handleClick}
                          />
                        </Link>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body1">
                        {review.description}
                      </Typography>
                    </Grid>
                  </>
                );
              })}
          </Grid>
        </Reviews>
        <Description>
          <Typography variant="body1">{description}</Typography>
        </Description>
        <DateOpen>
          <Box
            display="flex"
            flexDirection="row"
            justifySelf="center"
            Style="width: 100%;"
          >
            <Typography variant="body1">
              {active ? (
                <p>
                  <CheckIcon />
                  El Quiz está disponible
                </p>
              ) : (
                <p>
                  <ClearIcon />
                  El Quiz no está disponible
                </p>
              )}
            </Typography>
          </Box>
        </DateOpen>
        <ContactInfo>
          <Box display="flex" flexDirection="row" padding="0.2rem">
            <EmailIcon />
            <Typography variant="body1" Style="font-weight: bolder;">
              {schoolEmail}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="row" padding="0.2rem">
            <Typography variant="subtitle1">{schoolCity}</Typography>
          </Box>
          <Box display="flex" flexDirection="column">
            <Box display="flex" flexDirection="row" padding="0.2rem">
              <Typography variant="subtitle1">{schoolCountry}</Typography>
            </Box>
          </Box>
        </ContactInfo>
        <Actions>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Button
              color="primary"
              variant="contained"
              size="large"
              onClick={handleEnroll}
            >
              Enroll
            </Button>
          </Box>
        </Actions>
      </MainContainer>
    </div>
  );
}

export default QuizProfile;

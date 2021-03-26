import React from 'react';

//@material-ui/core
import {
  // Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Tooltip,
  // Typography,
} from '@material-ui/core/';

import GridContainer from 'components/Grid/GridContainer.jsx';
import NavPills from 'components/NavPills/NavPills.jsx';
import SchoolIcon from '@material-ui/icons/School';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Favorite from '@material-ui/icons/Favorite';
import DescriptionIcon from '@material-ui/icons/Description';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';

function ProfileTabs({
  activity,
  courses,
  favourites,
  teacherIn,
  role,
  ...props
}) {
  const tabs = [
    {
      tabButton: 'Mis Cursos',
      tabIcon: MenuBookIcon,
      tabContent: (
        <GridContainer justify="center">
          <List>
            {courses.map((course, idx) => {
              return (
                <ListItem
                  button
                  key={idx}
                  component={Link}
                  to={`/quiz-detail/${course.id}`}
                >
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary={course.name} />
                  <ListItemSecondaryAction>
                    <Tooltip
                      disableFocusListener
                      placement="right"
                      title={course.description}
                    >
                      <IconButton edge="end" aria-label="more info">
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </GridContainer>
      ),
    },
    {
      tabButton: 'Favoritos',
      tabIcon: Favorite,
      tabContent: (
        <GridContainer justify="center">
          <List>
            {favourites.map((fav, idx) => {
              return (
                <ListItem
                  button
                  key={idx}
                  component={Link}
                  to={`/quiz-detail/${fav.id}`}
                >
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary={fav.name} />
                  <ListItemSecondaryAction>
                    <Tooltip
                      disableFocusListener
                      placement="right"
                      title={fav.description}
                    >
                      <IconButton edge="end" aria-label="more info">
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </GridContainer>
      ),
    },
  ];
  if (role === 'teacher') {
    tabs.push({
      tabButton: 'Teacher In',
      tabIcon: SchoolIcon,
      tabContent: (
        <GridContainer justify="center">
          <List>
            {teacherIn.map((fav, idx) => {
              return (
                <ListItem button key={idx} component={Link} to="/quiz-detail/1">
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary={fav.title} />
                  <ListItemSecondaryAction>
                    <Tooltip
                      disableFocusListener
                      placement="right"
                      title="EL curso todavia no ha comenzado"
                    >
                      <IconButton edge="end" aria-label="more info">
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </GridContainer>
      ),
    });
  }

  return <NavPills alignCenter color="info" tabs={tabs} {...props} />;
}

export default ProfileTabs;

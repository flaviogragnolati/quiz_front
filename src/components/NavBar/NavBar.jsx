/* eslint-disable react/jsx-pascal-case */
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
// import SearchIcon from '@material-ui/icons/Search';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import ThemeToggler from './components/ThemeToggler';
import { useStyles } from './NavBarStyles';
import { SideBarContext } from '../../App';
import { PropTypes } from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Snackbar from 'components/Home_MUI/Snackbar';
import logoLight from 'assets/img/logo/logoLight.png';
import logoDark from 'assets/img/logo/logoDark.png';
import { Box } from '@material-ui/core';
import { useAuth } from 'components/Auth/AuthContext';
import { useDispatch } from 'react-redux';
import { ACTIONS } from 'store/rootReducer';

function NavBar({ toggleTheme, checked, theme }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const { openSidebar, toggleSideBar } = useContext(SideBarContext);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [notifier, setNotifier] = useState(false);

  const user = useAuth();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (e) => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuProfileSchool = () => {
    history.push(`/school-profile/${user.id}`)
    handleMenuClose();
  };
  
  const handleMenuProfile = () => {
    history.push(`/myprofile`)
    handleMenuClose();
  };
  
  const handleMenuLogout = () => {
    history.push(`/`);
    dispatch(ACTIONS.auth.logout());
    handleMenuClose();
  };

  const handleClose = () => {
    setNotifier(false);
  };

  const LogoContainer = styled.img`
    width: 2.5rem;
    height: 2.5rem;
    object-fit: contain;
    margin-right: 0.5rem;
  `;

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      position="fixed"
    >
      {Boolean(user) ? (
        <>
          <MenuItem onClick={user.type === "school" ? handleMenuProfileSchool : handleMenuProfile}>Profile</MenuItem>
          <MenuItem onClick={handleMenuLogout}>Logout</MenuItem>
        </>
      ) : (
        <MenuItem
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </MenuItem>
      )}
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      position="fixed"
    >
      {user && (
        <MenuItem>
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={11} color="primary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
      )}
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <IconButton
            onClick={() => toggleSideBar()}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Button component={Link} to="/" color="inherit" variant="text">
            <Box display="flex" flexDirection="row" justifyContent="flex-begin">
              <LogoContainer
                src={theme === 'light' ? logoLight : logoDark}
                alt="logo"
              />
              <Typography className={classes.title} variant="h6" noWrap>
                Quiz App
              </Typography>
            </Box>
          </Button>
          <div className={classes.grow} />
          {Boolean(!user) ? (
            <Button
              variant="outlined"
              color="primary"
              size="Large"
              component={Link}
              to="/login"
            >
              LOG IN
            </Button>
          ) : null}
          <div className={classes.sectionDesktop}>
            <IconButton>
              <ThemeToggler toggleTheme={toggleTheme} checked={checked} />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Snackbar
        open={notifier}
        onClose={handleClose}
        message="No hay cursos relacionados a la busqueda."
      />
    </div>
  );
}

export default NavBar;

NavBar.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  checked: PropTypes.string.isRequired,
};

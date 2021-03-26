import { Switch } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

function ThemeToggler({ toggleTheme, checked }) {
  return (
    <Switch
      checked={checked === 'light' ? false : true}
      color="primary"
      onChange={() => toggleTheme()}
      name="themeToggler"
    />
  );
}

ThemeToggler.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  checked: PropTypes.string.isRequired,
};

export default ThemeToggler;

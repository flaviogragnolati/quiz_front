import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

function SidebarItem({ link, label, icon, itemProps, iconProps, textProps }) {
  return (
    <ListItem button key={label} component={Link} to={link} {...itemProps}>
      <ListItemIcon {...iconProps}>{icon}</ListItemIcon>
      <ListItemText primary={label} {...textProps} />
    </ListItem>
  );
}

export default SidebarItem;

SidebarItem.propTypes = {
  link: PropTypes.oneOfType(PropTypes.string, PropTypes.object),
  label: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  itemProps: PropTypes.string,
  iconProps: PropTypes.string,
  textProps: PropTypes.string,
};

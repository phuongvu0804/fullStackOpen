import React from 'react';
import { Link } from 'react-router-dom';

//MUI
import AppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

const NavbarItem = ({ text, to }) => {
  return (
    <ListItem className="nav-bar__item">
      <Typography variant="h6" component={Link} to={to}>
        {text}
      </Typography>
    </ListItem>
  );
};

const Navbar = () => {
  const NavbarList = [
    {
      text: 'Home',
      to: '/',
    },
    {
      text: 'Users',
      to: '/users',
    },
  ];

  return (
    <AppBar position="relative" component="nav">
      <List sx={{ display: 'flex' }}>
        {NavbarList.map((item, index) => (
          <NavbarItem key={index} text={item.text} to={item.to} />
        ))}
      </List>
    </AppBar>
  );
};

export default Navbar;

import React from 'react';

//MUI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

const LogInForm = ({ handleLogIn, username, password, handleUsernameChange, handlePasswordChange }) => {
  return (
    <Box component="form" onSubmit={handleLogIn}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <InputLabel sx={{ marginRight: 1 }}>Username</InputLabel>
        <TextField
          id="logInUsername"
          value={username}
          onChange={handleUsernameChange}
          type="text"
          name="username"
          variant="standard"
          size="small"
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <InputLabel sx={{ marginRight: 1 }}>Password</InputLabel>
        <TextField
          id="logInPassword"
          value={password}
          onChange={handlePasswordChange}
          type="text"
          name="password"
          variant="standard"
          size="small"
        />
      </Box>
      <Button type="submit" variant="contained" size="medium" sx={{ background: 'var(--primary-color)', marginTop: 1 }}>
        Log in
      </Button>
    </Box>
  );
};

export default LogInForm;

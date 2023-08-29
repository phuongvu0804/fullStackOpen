import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

//MUI
import Typography from '@mui/material/Typography';

const Notification = () => {
  const noti = useSelector((state) => state.noti);

  if (!noti.content) return null;

  return (
    <Typography variant="h5" className={noti.type} style={{ border: '1px solid black' }}>
      {noti.content}
    </Typography>
  );
};

Notification.propTypes = {
  noti: PropTypes.string.isRequired,
};

export default Notification;

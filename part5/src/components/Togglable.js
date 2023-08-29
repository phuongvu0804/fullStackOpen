import React, { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

//MUI
// import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <div>
      <Button variant="outlined" size="small" sx={{ textTransform: 'unset' }} style={hideWhenVisible} onClick={toggleVisibility}>
        {buttonLabel}
      </Button>
      <div style={showWhenVisible}>{children}</div>
      <Button variant="outlined" size="small" sx={{ textTransform: 'unset' }} style={showWhenVisible} onClick={toggleVisibility}>
        Cancel
      </Button>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;

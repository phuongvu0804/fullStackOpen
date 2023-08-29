import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNoti } from '../reducers/notiReducer';

//MUI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';

const BlogForm = ({ createBlog }) => {
  const dispatch = useDispatch();
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    isLiked: false,
  });

  const handleCheckFields = () => {
    let isValidField = true;

    for (const field in newBlog) {
      const fieldValue = newBlog[field];

      //Check if all fields are filled (except isLiked field)
      if (field !== 'isLiked' && !fieldValue) {
        dispatch(
          setNoti({
            type: 'error',
            content: `${field.charAt(0).toUpperCase() + field.slice(1)} is missing `,
          }),
        );

        return (isValidField = false);
      }
    }

    return isValidField;
  };

  const addBlog = (event) => {
    event.preventDefault();
    const isValidNewBlog = handleCheckFields();
    if (isValidNewBlog) {
      setNewBlog({
        title: '',
        author: '',
        url: '',
        isLiked: false,
      });

      createBlog(newBlog);
    }
  };

  return (
    <div>
      <Typography variant="h6" color="primary">Create new blog</Typography>
      <Box component="form" onSubmit={addBlog}>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <InputLabel sx={{ marginRight: 1 }}>Title:</InputLabel>

          <TextField
            variant="outlined"
            size="small"
            type="text"
            name="title"
            placeholder="Write blog title here"
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <InputLabel sx={{ marginRight: 1 }}>Author:</InputLabel>

          <TextField
            variant="outlined"
            size="small"
            type="text"
            name="author"
            placeholder="Write blog author here"
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <InputLabel sx={{ marginRight: 1 }}>Url:</InputLabel>

          <TextField
            variant="outlined"
            size="small"
            type="text"
            name="url"
            placeholder="Write blog url here"
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          />
        </Box>
        <Button className="createBtn" variant="outlined" size="small" sx={{ textTransform: 'unset', marginY: 1 }} >Create</Button>
      </Box>
    </div>
  );
};

export default BlogForm;

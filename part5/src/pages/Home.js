import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import userService from '../services/users';
import blogService from '../services/blogs';
import loginService from '../services/login';
import { initializeBlogs } from '../reducers/blogReducer';
import { appendUser, removeUser } from '../reducers/userReducer';
import { setNoti } from '../reducers/notiReducer';

import BlogForm from '../components/BlogForm';
import Blogs from '../components/Blogs';
import LogInForm from '../components/LogInForm';
import Togglable from '../components/Togglable';
import Notification from '../components/Notification';

//MUI
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInBlogAppUser');
    dispatch(removeUser(user));
  };

  //Get all blogs if user logged in
  useEffect(() => {
    if (user) {
      dispatch(initializeBlogs(handleLogOut));
    }
  }, [user]);

  const handleLogIn = async (event) => {
    event.preventDefault();

    try {
      const loggedInUser = await loginService.login({ username, password });
      blogService.setToken(loggedInUser.token);
      window.localStorage.setItem('loggedInBlogAppUser', JSON.stringify(loggedInUser));
      dispatch(appendUser(loggedInUser));

      setUsername('');
      setPassword('');
    } catch (error) {
      dispatch(
        setNoti({
          type: 'error',
          content: error.response.data.error,
        }),
      );
    }
  };

  const handleCreateBlog = async (blogObject) => {
    try {
      const result = await blogService.create(blogObject);
      const userDetails = await userService.getById(result.user);

      result.user = userDetails;
      setBlogs(blogs.concat(result));
      dispatch(
        setNoti({
          type: 'success',
          content: `You have created the new blog ${blogObject.title}`,
        }),
      );

      blogFormRef.current.toggleVisibility();
    } catch (error) {
      dispatch(
        setNoti({
          type: 'error',
          content: error.response.data.error,
        }),
      );
    }
  };

  const renderIfUserLoggedIn = () => {
    if (user) {
      return (
        <>
          <div>
            <Notification />

            <div>
              <Typography sx={{ marginY: 1 }}>
                <Link to={`users/${user.username}`}>{user.username}</Link> logged in
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  marginBottom: 2,
                  textTransform: 'unset',
                }}
                id="logOutBtn"
                onClick={handleLogOut}
              >
                Log out
              </Button>
            </div>
            <Togglable ref={blogFormRef} buttonLabel="Create new blog">
              <BlogForm createBlog={handleCreateBlog} />
            </Togglable>
          </div>

          {user && <Blogs blogs={blogs} setBlogs={setBlogs} />}
        </>
      );
    }
  };

  if (user) {
    return renderIfUserLoggedIn();
  }

  return (
    <LogInForm
      handleLogIn={handleLogIn}
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
    />
  );
};

export default Home;

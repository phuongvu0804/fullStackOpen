import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import UserList from './pages/UserList';
import Home from './pages/Home';
import { useDispatch } from 'react-redux';
import { appendUser } from './reducers/userReducer';
import User from './pages/User';
import Blog from './pages/Blog';
import Navbar from './components/Navbar';

import blogService from './services/blogs';

//MUI
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const App = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);

  /*const handleLogOut = () => {
    window.localStorage.removeItem('loggedInBlogAppUser');
    dispatch(removeUser(user));
  };*/

  //Check if user is logged in
  useEffect(() => {
    const loggedInUserJson = window.localStorage.getItem('loggedInBlogAppUser');
    if (loggedInUserJson) {
      const user = JSON.parse(loggedInUserJson);
      dispatch(appendUser(user));

      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Container>
        <Typography variant="h1" gutterBottom>
          Blogs
        </Typography>
        {/* {user && (
          <div>
            <p>
              <Link to={`users/${user.username}`}>{user.username}</Link> logged in
            </p>
            <button id="logOutBtn" onClick={handleLogOut}>
              Log out
            </button>
          </div>
        )} */}

        <Routes>
          <Route path="/users/:id" element={<User />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/" element={<Home />} />
        </Routes>

      </Container>
    </div>
  );
};

export default App;

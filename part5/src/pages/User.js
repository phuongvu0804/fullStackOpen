import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import userService from '../services/users';

const User = () => {
  const username = useParams().id;
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const data = await userService.getAll();
      const response = data.filter((item) => item.username === username);

      if (response.length) {
        setUserDetails(response[0]);
      }
    };

    fetchUserDetails();
  }, []);

  const renderBlogDetails = () => {
    const blogs = userDetails.blogs;
    if (blogs.length === 0) {
      return <p>There is no added blog</p>;
    }
    return userDetails.blogs.map((blog) => (
      <li key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
      </li>
    ));
  };

  if (!userDetails) {
    return null;
  }

  return (
    <div>
      <h1>{userDetails.name.charAt(0).toUpperCase() + userDetails.name.slice(1)}</h1>
      <h3>Added Blogs</h3>
      <ul>{renderBlogDetails()}</ul>
    </div>
  );
};

export default User;

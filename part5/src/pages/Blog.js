import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import blogService from '../services/blogs';
import userService from '../services/users';

const Blog = () => {
  const blogId = useParams().id;
  const user = useSelector(state => state.user);
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchBlogDetails = async () => {
      const blog = await blogService.getById(blogId);

      const addedUser = await userService.getById(blog.user);

      blog.addedUser = addedUser.name;
      setBlog(blog);
    };

    fetchBlogDetails();
  }, [user]);


  if (!blog) {
    return null;
  }

  const handleComment = async () => {
    await blogService.comment(blogId, {
      content: comment,
    });

    setBlog({ ...blog, comments: [...blog.comments, comment] });
    setComment('');
  };

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>Url: {blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <p>Added by: {blog.addedUser.charAt(0).toUpperCase() + blog.addedUser.slice(1)}</p>
      <div>
        <h2>Comments</h2>
        <div>
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
          <button onClick={handleComment}>Add comment</button>
        </div>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;

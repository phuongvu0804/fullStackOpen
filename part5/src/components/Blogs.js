import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNoti } from '../reducers/notiReducer';

import blogService from '../services/blogs';
import Blog from './Blog';

const Blogs = ({ blogs, setBlogs }) => {
  const blogState = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  //Sort blogs by likes
  useEffect(() => {
    const sortedBlogs = [...blogState].sort((a, b) => (a.likes > b.likes ? -1 : 0));
    setBlogs(sortedBlogs);
  }, [blogState]);

  const handleUpdateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject);
      const updatedBlogsArray = blogState.map((blog) => {
        if (blog.id === updatedBlog.id) {
          return updatedBlog;
        } else {
          return blog;
        }
      });

      setBlogs(updatedBlogsArray);
      dispatch(
        setNoti({
          type: 'success',
          content: 'You have successfully updated the blog',
        }),
      );
    } catch (error) {
      dispatch(
        setNoti({
          type: 'error',
          content: error.response.data.error,
        }),
      );
    }
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await blogService.deleteOne(blogId);

      const newBlogArray = [...blogState].filter((blog) => blog.id !== blogId);
      setBlogs(newBlogArray);

      dispatch(
        setNoti({
          type: 'success',
          content: 'You have successfully deleted the blog',
        }),
      );
    } catch (error) {
      console.log('error delete', error);
      dispatch(
        setNoti({
          type: 'error',
          content: error.response.data.error,
        }),
      );
    }
  };

  return blogs.map((blog) => (
    <Blog key={blog.id} blog={blog} updateBlog={handleUpdateBlog} deleteBlog={handleDeleteBlog} />
  ));
};

export default Blogs;

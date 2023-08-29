import { useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [details, setDetails] = useState(false);
  const [like, setLike] = useState(blog.isLiked);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
  };

  const visibleByDetails = { display: details ? '' : 'none' };

  const likeText = like ? 'Liked' : 'Like';
  const toggleDetails = async () => {
    setDetails(!details);
  };

  const handleLike = () => {
    const newBlog = { ...blog };
    if (like) {
      newBlog.likes = blog.likes - 1;
    } else {
      newBlog.likes = blog.likes + 1;
    }

    newBlog.isLiked = !blog.isLiked;
    console.log('like', newBlog);
    setLike(!like);

    updateBlog(newBlog);
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author || blog.user.name}`)) {
      deleteBlog(blog.id);
    }
  };

  const renderDetails = () => {
    return (
      <ul style={visibleByDetails} className="blogDetails">
        <li>Author: {blog.author}</li>
        <li>
          Likes: <span className="blogLike">{blog.likes}</span>
          <button className="likeBtn" onClick={handleLike}>
            {likeText}
          </button>
        </li>
        <li>URL: {blog.url}</li>
        <li>Creator: {blog.user.username}</li>
      </ul>
    );
  };

  const renderRemoveBtn = () => {
    if (blog.user.username === JSON.parse(window.localStorage.getItem('loggedInBlogAppUser')).username) {
      return (
        <button onClick={handleDelete} style={{ margin: '5px 4px', color: 'red' }}>
          Remove
        </button>
      );
    }
  };

  return (
    <div style={blogStyle}>
      <div className="blog">
        <div>
          <Link to={`/blogs/${blog.id}`} style={{ marginRight: 5 }}>
            {blog.title}
          </Link>
          <button className="view" onClick={toggleDetails}>
            {details ? 'Hide' : 'View'}
          </button>
          {renderRemoveBtn()}
        </div>
        {renderDetails()}
      </div>
    </div>
  );
};

export default Blog;

import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    isLiked: false
  })

  const addBlog = (event) => {
    event.preventDefault()

    createBlog(newBlog)

    setNewBlog({
      title:'',
      author:'',
      url:''
    })
  }

  return (
    <div>
      <p>Create new blog</p>
      <form onSubmit={addBlog}>
        <div>
          <span>title:</span>
          <input
            type='text'
            name='title'
            placeholder='Write blog title here'
            value={newBlog.title}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
        </div>
        <div>
          <span>author:</span>
          <input
            type='text'
            name='author'
            placeholder='Write blog author here'
            value={newBlog.author}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </div>
        <div>
          <span>url:</span>
          <input
            type='text'
            name='url'
            placeholder='Write blog url here'
            value={newBlog.url}
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <button className='createBtn'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm

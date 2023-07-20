import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import LogInForm from './components/LogInForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [noti, setNoti] = useState(null)

  const blogFormRef = useRef()

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedInBlogAppUser')
    setUser(null)
  }

  useEffect(() => {
    const loggedInUserJson = window.localStorage.getItem('loggedInBlogAppUser')
    if (loggedInUserJson) {
      const user = JSON.parse(loggedInUserJson)
      setUser(user)
      blogService.setToken(user.token)

      //Get all blogs if user logged in
      blogService
        .getAll()
        .then((blogs) => {
          const sortedBlogs = [...blogs].sort((a, b) => a.likes > b.likes ? -1 : 1)
          setBlogs(sortedBlogs)
        })
        .catch((error) => {
          //Automatically log out if token is expired
          if (error.response.status === 401) {
            handleLogOut()
          }
        })
    }
  }, [])

  useEffect(() => {
    if (user) {
      //Get all blogs if user logged in
      blogService.setToken(user.token)
      blogService.getAll().then((blogs) => setBlogs(blogs))
    }
  }, [user])



  const handleLogIn = async (event) => {
    event.preventDefault()

    try {
      const loggedInUser = await loginService.login({ username, password })
      blogService.setToken(loggedInUser.token)
      window.localStorage.setItem(
        'loggedInBlogAppUser',
        JSON.stringify(loggedInUser)
      )

      setUser(loggedInUser)
      setUsername('')
      setPassword('')
      setNoti({
        type: 'success',
        content: 'You have successfully logged in',
      })
    } catch (error) {
      setNoti({
        type: 'error',
        content: error.response.data.error,
      })
    } finally {
      setTimeout(() => {
        setNoti(null)
      }, 10000)
    }
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const result = await blogService.create(blogObject)
      const userDetails = await userService.getById(result.user)

      result.user = userDetails
      setBlogs(blogs.concat(result))

      setNoti({
        type: 'success',
        content: `You have created the new blog ${blogObject.title}`,
      })

      blogFormRef.current.toggleVisibility()
    } catch (error) {
      console.log('error', error)
      setNoti({
        type: 'error',
        content: error.response.data.error,
      })
    } finally {
      setTimeout(() => {
        setNoti(null)
      }, 5000)
    }
  }

  const handleUpdateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject)
      const updatedBlogsArray = blogs.map((blog) => {
        if (blog.id === updatedBlog.id) {
          return updatedBlog
        } else {
          return blog
        }
      })

      setBlogs(updatedBlogsArray)
      setNoti({
        type: 'success',
        content: 'You have successfully updated the blog',
      })
    } catch (error) {
      setNoti({
        type: 'error',
        content: error.response.data.error,
      })
    } finally {
      setTimeout(() => {
        setNoti(null)
      }, 5000)
    }
  }

  const handleDeleteBlog = async (blogId) => {
    try {
      await blogService.deleteOne(blogId)

      const newBlogArray = [...blogs].filter((blog) => blog.id !== blogId)
      setBlogs(newBlogArray)

      setNoti({
        type: 'success',
        content: 'You have successfully deleted the blog',
      })
    } catch (error) {
      console.log('error delete', error)
      setNoti({
        type: 'error',
        content: error.response.data.error,
      })
    } finally {
      setTimeout(() => {
        setNoti(null)
      }, 5000)
    }
  }

  const renderIfUserLoggedIn = () => {
    if (user) {
      return (
        <>
          <div>
            <div>
              <span>{user.username} logged in</span>
              <button id='logOutBtn' onClick={handleLogOut}>Log out</button>
            </div>
            <Togglable ref={blogFormRef} buttonLabel='Create new blog'>
              <BlogForm createBlog={handleCreateBlog} />
            </Togglable>
          </div>

          {user &&
            blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={handleUpdateBlog}
                deleteBlog={handleDeleteBlog}
              />
            ))}
        </>
      )
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      {noti && <Notification noti={noti} />}
      {!user && (
        <LogInForm
          handleLogIn={handleLogIn}
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
        />
      )}
      {renderIfUserLoggedIn()}
    </div>
  )
}

export default App

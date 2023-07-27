const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id

  const blog = await Blog.findById(id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})


blogsRouter.post('/', async (request, response) => {
  const { body, user } = request

  if( !user ){
    return response.status(401).json({ error: 'token invalid' })
  }


  if (!body.title || !body.url) {
    return response.status(400).end()
  }

  if (!body.likes) {
    body.likes = 0
  }
  
  const newBlog = {...body, user: user._id}
  const blog = new Blog(newBlog)

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  if (!user) {
    return response.status(400).end()
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === user.id) {
    await Blog.findByIdAndRemove(request.params.id)
    
    user.blogs = [...user.blogs.filter(item => item.id !== request.params.id)]
    await user.save()

    return response.status(204).end()
  } else {
    return response.status(401).json({ error: 'Invalid token or user'})
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    isLiked: body.isLike
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter
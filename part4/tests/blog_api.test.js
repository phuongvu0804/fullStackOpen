const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  //Reset user db
  await User.deleteMany()
  await Blog.deleteMany()

  //Create blogs without user
  await Blog.insertMany(helper.initialBlogs)
}, 10000)

describe('when there initially some blogs saved', () => {
  let token
  beforeEach(async () => {
    const saltRounds = 10
    const passwordHash =  await bcrypt.hash('abc123', saltRounds)

    const rootUser = await new User({
      username: 'rootUser',
      name: 'abc',
      passwordHash
    }).save()

    const userForToken = {
      username: rootUser.username,
      id: rootUser.id,
    }

    token = jwt.sign(userForToken, process.env.SECRET)
  })

  test('correct number of blogs in JSON', async ()  => {
    const result = await api
      .get('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
    expect(result.body).toHaveLength(helper.initialBlogs.length)
  
  }, 10000)
})

describe('viewing a specific blog', () => {
  let token
  beforeEach(async () => {
    const saltRounds = 10
    const passwordHash =  await bcrypt.hash('abc123', saltRounds)

    const rootUser = await new User({
      username: 'rootUser',
      name: 'abc',
      passwordHash
    }).save()

    const userForToken = {
      username: rootUser.username,
      id: rootUser.id,
    }

    token = jwt.sign(userForToken, process.env.SECRET)
  })

  test('a unique id is verified', async () => {
    const response = await helper.blogsInDb()
  
    response.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  }, 10000)

  test('view a blog by specific id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const result = await api
      .get(`/api/blogs/${blogToView.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body).toEqual(blogToView)
  })

})

describe('addition of a blog', () => {
  let token
  beforeEach(async () => {
    const saltRounds = 10
    const passwordHash =  await bcrypt.hash('abc123', saltRounds)

    const rootUser = await new User({
      username: 'rootUser',
      name: 'abc',
      passwordHash
    }).save()

    const userForToken = {
      username: rootUser.username,
      id: rootUser.id,
    }

    token = jwt.sign(userForToken, process.env.SECRET)
  }, 10000)

  test('a new post can be added', async () => {
    const newBlog = {
      title: 'Python patterns',
      author: 'Michael Chung',
      url: 'https://reactpatterns.com/',
      likes: 8,
      __v: 0,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
  
    const titles = blogsAtEnd.map(r => r.title)
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('Python patterns')
  }, 10000)

  test('a missing likes property is set to 0', async () => {
    const newBlog = {
      title: 'Python patterns',
      author: 'Michael Chung',
      url: 'https://reactpatterns.com/',
      __v: 0,
    }
  
    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
    
    expect(result.body.likes).toEqual(0)  
  }, 10000)
  
  test('a missing url/ title property will return 400', async () => {
    const newBlog = {
      author: 'Michael Chung',
      url: 'https://reactpatterns.com/',
      __v: 0,
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()
  
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  }, 10000)
})

describe('deletion of a blog', () => {
  let token
  beforeEach(async () => {
    //Create root user
    const saltRounds = 10
    const passwordHash =  await bcrypt.hash('abc123', saltRounds)

    const rootUser = await new User({
      username: 'rootUser',
      name: 'abc',
      passwordHash
    }).save()

    const userForToken = {
      username: rootUser.username,
      id: rootUser.id,
    }

    token = jwt.sign(userForToken, process.env.SECRET)

    //Reset blog db 
    await Blog.deleteMany({})

    const initialBlogswithUser = helper.initialBlogs.map(blog => {
      blog.user = rootUser.id
      return blog
    })

    await Blog.insertMany(initialBlogswithUser)
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    const idsArray = blogsAtEnd.map(r => r.id)
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    expect(idsArray).not.toContain(blogToDelete.id)
  }, 10000)
})

describe('updation of a blog', () => {
  let token
  beforeEach(async () => {
    //Create root user
    const saltRounds = 10
    const passwordHash =  await bcrypt.hash('abc123', saltRounds)

    const rootUser = await new User({
      username: 'rootUser',
      name: 'abc',
      passwordHash
    }).save()

    const userForToken = {
      username: rootUser.username,
      id: rootUser.id,
    }

    token = jwt.sign(userForToken, process.env.SECRET)

    //Reset blog db 
    await Blog.deleteMany({})
    
    const initialBlogswithUser = helper.initialBlogs.map(blog => {
      blog.user = rootUser.id
      return blog
    })

    await Blog.insertMany(initialBlogswithUser)
  })

  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes = 10

    const result = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(result.body.likes).toBe(10)
  }, 10000)
})

afterAll(async () => {
  await mongoose.connection.close()
})
import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
  test('calls event handler with right details when create new blog', async () => {
    const blog = {
      title: 'Blog list tests',
      author: 'fullstackopen',
      url: 'https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16',
      likes: 1,
      isLiked: false
    }
    const user = userEvent.setup()
    const createBlog = jest.fn()
    const { container } = render(<BlogForm createBlog={createBlog}/>)

    //Open blog form
    const openBlogFormBtn = screen.getByText('Create new blog')
    await user.click(openBlogFormBtn)

    //Create new blog
    const titleInput = screen.getByPlaceholderText('Write blog title here')
    const authorInput = screen.getByPlaceholderText('Write blog author here')
    const urlInput = screen.getByPlaceholderText('Write blog url here')
    await user.type(titleInput, blog.title)
    await user.type(authorInput, blog.author)
    await user.type(urlInput, blog.url)

    const createBtn = container.querySelector('.createBtn')
    await user.click(createBtn)

    //Check if event handler is called
    expect(createBlog.mock.calls).toHaveLength(1)

    //Check if event handler is called with the right blog details
    expect(createBlog.mock.calls[0][0]).toEqual(blog)
  })
})

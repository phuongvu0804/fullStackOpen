import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

describe('<Blog/>', () => {
  const blog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }

  test('renders only title and author', async () => {
    const { container } = render(<Blog blog={blog}/>)
    const element = container.querySelector('.blogDetails')
    expect(element).toHaveStyle('display: none')
  })

  test('renders details when view btn are clicked', async () => {
    const user = userEvent.setup()
    const { container } = render(<Blog blog={blog}/>)
    const viewBtn = screen.getByText('View')
    const element = container.querySelector('.blogDetails')

    await user.click(viewBtn)

    expect(element).not.toHaveStyle('display: none')
  })

  test('like btn clicks twice, event handler is called twice', async () => {
    const updateBlog = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<Blog blog={blog} updateBlog={updateBlog}/>)
    const likeBtn = container.querySelector('.likeBtn')

    await user.click(likeBtn)
    await user.click(likeBtn)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })
})

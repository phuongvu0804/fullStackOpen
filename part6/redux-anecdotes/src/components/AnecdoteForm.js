import React from "react"
import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const content = event.target.anecdote.value
    event.target.anecdote.value = ""
    dispatch(createAnecdote(content))

    dispatch(setNotification('You have successfully created an anecdote', 5000))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new</h2>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default AnecdoteForm

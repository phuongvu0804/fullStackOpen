import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();

  const handleSort = (array) => {
    return array.sort((a, b) => {
      if (a.votes > b.votes) {
        return -1
      } else if (a.votes > b.votes) {
        return 1
      } else {
        return 0
      }
    })
  }

  const handleFilter = (array, filter) => {
    const filteredArray = array.filter(n => {
      return n.content.includes(filter)
    })

    return filteredArray
  }

  const anecdotes = useSelector(({anecdotes, filter}) => {
    const filteredState = handleFilter([...anecdotes], filter)
    const sortedState = handleSort([...filteredState])
    return sortedState
  });

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted ${anecdote.content}`, 5000))
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => handleVote(anecdote)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;

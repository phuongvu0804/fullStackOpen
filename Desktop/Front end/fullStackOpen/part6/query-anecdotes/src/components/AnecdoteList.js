import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNotificationDispatch } from "../NotificationContext";
import { voteAnecdote } from "../requests";

const Anecdote = ({anecdote, handleClick}) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: votedAnecdote => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', anecdotes.map(n => n.id === votedAnecdote.id ? votedAnecdote : n))
    }
  })

  const handleVote = (anecdote) => {
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    voteAnecdoteMutation.mutate(votedAnecdote);
    dispatch({type: 'ADD', payload: `You have voted ${anecdote.content}!`})
  };


  return (
    <div>
      {anecdotes.map((anecdote) => (
       <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => handleVote(anecdote)}/>
      ))}
      ¯
    </div>
  );
};

export default AnecdoteList;

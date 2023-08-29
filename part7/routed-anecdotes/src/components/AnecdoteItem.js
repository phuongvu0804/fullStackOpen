import React from "react";

const AnecdoteItem = ({ anecdote }) => {
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>
        has {anecdote.votes} 
      </p>
      <p>
        <span>For more info see: </span>
        {anecdote.info}
      </p>
    </div>
  );
};

export default AnecdoteItem;

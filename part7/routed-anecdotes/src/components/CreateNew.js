import React from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = (props) => {
  const navigate = useNavigate();
  const { reset: resetContent, ...content } = useField("content");
  const { reset: resetAuthor, ...author } = useField("author");
  const { reset: resetInfo, ...info } = useField("info");

  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });

    props.handleNotification(`A new anecdote: ${content.value} has been created`);
    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
      </form>
      <button onClick={handleReset}>reset</button>
    </div>
  );
};

export default CreateNew;

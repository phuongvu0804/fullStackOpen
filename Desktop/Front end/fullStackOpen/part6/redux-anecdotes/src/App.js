import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Notification from "./components/Notification";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import AnecdoteList from "./components/AnecdoteList";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps  

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AnecdoteList />
      <AnecdoteForm/> 
    </div>
  );
};

export default App;

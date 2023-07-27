import { useQuery } from 'react-query'

import { getAnecdotes } from './requests'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  const {isLoading, isError, data, error} = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: 3
  })

  if (isLoading) {
    return <div>...Loading</div>
  } 
  
  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const anecdotes = data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm/>
      <AnecdoteList anecdotes={anecdotes}/>
    </div>
  )
}

export default App

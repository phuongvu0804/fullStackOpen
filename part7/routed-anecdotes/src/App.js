import { useEffect, useState } from 'react'

import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import { Route, Routes, useMatch } from 'react-router-dom'
import AnecdoteItem from './components/AnecdoteItem'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        setNotification((''))
      }, 5000)
    }
  }, [notification])

  const match = useMatch('/:id')
  const anecdote = match ? anecdotes.find(n => n.id === Number(match.params.id)) : null
  
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && <p>{notification}</p>}
      <Routes>
       <Route path="/:id" element={<AnecdoteItem anecdote={anecdote}/>}/>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes}/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/create" element={<CreateNew addNew={addNew} handleNotification={setNotification}/>}/>
      </Routes>

      <Footer />
    </div>
  )
}

export default App

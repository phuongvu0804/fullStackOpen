import axios from 'axios'

const baseUrl = 'http://localhost:3002/anecdotes'

export const getAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const createAnecdote = async (newAnecdote) => {
    if (newAnecdote.content.length < 5) {
        throw new Error('Too short anecodte, must have length 5 or more')
    }
    
    try {
        const response = await axios.post(baseUrl, newAnecdote)
        return response.data
    } catch (e) {
        console.error(e)
    }

}

export const voteAnecdote = async (anecdote) => {
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return response.data
}
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Phonebook = require('./models/phonebook')
const app = express()

//Error middleware
const errorHandler = (error, request, response, next) => {
  if(error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id'  })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

morgan.token('content', function (req) {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))
app.use(cors())
app.use(express.static('build'))

//Get all contacts from phonebook
app.get('/api/persons', (request, response, next) => {
  Phonebook.find({})
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

//Get a certain contact from phonebook
app.get('/api/persons/:id', (request, response, next) => {
  Phonebook.findById(request.params.id)
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})


//Get total number of contacts with current time
app.get('/info', (request, response, next) => {
  const receivedTime = new Date()

  Phonebook.countDocuments()
    .then(contactNumber => {
      response.send(`<p>Phonebook has infor for ${ contactNumber } ${ contactNumber > 1 ? 'people': 'person' }</p><p>${ receivedTime }</p>`)
    })
    .catch(error => next(error))
})

//Delete a certain contact
app.delete('/api/persons/:id', (request, response, next) => {
  Phonebook
    .findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

//Add a new contact
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const phonebookItem = new Phonebook({
    name: body.name,
    number: body.number
  })

  phonebookItem.save()
    .then(savedItem => {
      response.json(savedItem)
    })
    .catch(error => next(error))
})

//Update a new contact
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const contact = {
    name: body.name,
    number: body.number
  }

  Phonebook.findByIdAndUpdate(request.params.id, contact, { new: true, runValidators: true, context: 'query' })
    .then(updatedItem => {
      response.json(updatedItem)
    })
    .catch(error => next(error))
})


const PORT = process.env.PORT
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening on port ${ PORT }`)
})

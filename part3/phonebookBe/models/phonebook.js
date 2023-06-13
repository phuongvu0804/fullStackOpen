const mongoose = require('mongoose')

mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(err => {
    console.log('error connecting to MongoDB', err.message)
  })

const checkValidPhoneNumber = (value) => {
  let isValidNumber = value.length >= 9 ? true : false

  if (isValidNumber) {
    if (value[2] === '-' || value[3] === '-') {
      const dashArr = Array.from(value).filter(digit => {
        return digit === '-'
      })

      if (dashArr.length > 1) {
        isValidNumber = false
      }
    } else {
      return isValidNumber = false
    }
  }

  return isValidNumber
}

const phonebookItemSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'User name is required']
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return checkValidPhoneNumber(v)
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'User phone number is required']
  }
})

phonebookItemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phonebook', phonebookItemSchema)
import React, { useState } from 'react'

import { useCountry } from './hooks'
import Country from './components/Country'
import SearchForm from './components/SearchForm'


const App = () => {
  const [name, setName] = useState('')
  const country = useCountry(name)

  return (
    <div>
      <SearchForm handleName={setName}/>
      <Country country={country} />
    </div>
  )
}

export default App
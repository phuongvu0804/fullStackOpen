import React from 'react'
import countryService from '../services/countryService'

const CountryItem = ({data, setCountries}) => {
    const handleCountryDetails = () => {
        countryService
            .getData(data.name.common)
            .then(data => setCountries(data))
    }

  return (
    <li className="country-item">
        <span>{data.name.common}</span>
        <button className="country-item__btn" onClick={handleCountryDetails}>Show</button>
    </li>
  )
}

export default CountryItem
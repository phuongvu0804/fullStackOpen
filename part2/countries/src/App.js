import { useEffect, useState } from "react";
import SearchForm from "./components/SearchForm";
import CountryData from "./components/CountryData";
import countryService from "./services/countryService";
import CountryItem from "./components/CountryItem";
import "./index.css"

function App() {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    if (search) {
      countryService
        .getData(search)
        .then(data => {
          setCountries(data)
        })
    } else {
      setCountries(null)
    }
  }, [search])

  const renderListofCountries = () => {
    if (countries?.length) {
      if (countries.length > 10) {
        return <p>Too many matches, sepcify another filter</p>
      } else if (countries.length < 10 && countries.length > 1) {
        return countries.map((country, i) => <CountryItem key={i} data={country} setCountries={setCountries}/>)
      } else {
        return <CountryData data={countries[0]} />
      }
    } 

  }

  return (
    <div className="App">
      <SearchForm search={search} setSearch={setSearch}/>
      {renderListofCountries()}
    </div>
  );
}

export default App;

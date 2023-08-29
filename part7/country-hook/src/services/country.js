import axios from "axios"

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = async () => {
    const response = await axios.get(`${baseUrl}/all`)
    return response.data
}

const getByName = async (countryName) => {
    const response = await axios.get(`${baseUrl}/name/${countryName}`)
    return response.data
}

export default { getAll, getByName }
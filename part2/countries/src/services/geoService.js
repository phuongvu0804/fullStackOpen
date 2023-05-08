import axios from "axios"

const baseUrl = "http://api.openweathermap.org/geo/1.0/direct"
const apiKey = process.env.REACT_APP_API_KEY

const getGeo = (location) => {
   const request = axios.get(`${baseUrl}?q=${location}&appid=${apiKey}`)
   return request.then(response => response.data)
}


export default { getGeo }
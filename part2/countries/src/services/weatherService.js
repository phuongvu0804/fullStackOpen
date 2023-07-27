import axios from "axios"

const baseUrl = "https://api.openweathermap.org/data/2.5/weather"
const apiKey = process.env.REACT_APP_API_KEY

const getWeather = (data) => {
   const request = axios.get(`${baseUrl}?lat=${data.lat}&lon=${data.lon}&appid=${apiKey}`)
   return request.then(response => response.data)
}


export default { getWeather }
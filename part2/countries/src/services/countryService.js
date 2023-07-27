import axios from "axios"

const baseUrl = "https://restcountries.com/v3.1"

const getData = (searchValue) => {
   const request = axios.get(`${baseUrl}/name/${searchValue}`)
   return request.then(response => response.data)

}


export default { getData }
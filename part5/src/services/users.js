import axios from 'axios'
const baseUrl = '/api/users'

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { getById }
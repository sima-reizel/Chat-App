import axios from 'axios'

const API_URL = 'http://localhost:5000'

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData)
  return response.data
}

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData)
  return response.data
}

//  מעכשיו צריך לגשת עם הטוקן לשרת
// זה סה"כ דוגמא
// export const getWithAuth = async (url) => {
//   const token = localStorage.getItem('token')
//   return axios.get(`${API_URL}${url}`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   })
// }

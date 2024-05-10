import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        }
})

export default axiosClient
import axios from 'axios'

const seekerUrl = 'http://localhost:3000/api/seeker'
// const companyUrl = 'http://localhost:3000/api/company'
// const adminUrl = 'http://localhost:3000/api/admin'



export const axiosSeeker = axios.create({
    baseURL: seekerUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})



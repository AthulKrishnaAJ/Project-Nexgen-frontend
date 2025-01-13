import axios from 'axios'

const seekerUrl = 'http://localhost:9009/api/seeker'
const companyUrl = 'http://localhost:9009/api/company'
// const adminUrl = 'http://localhost:9009/api/admin'



export const axiosSeeker = axios.create({
    baseURL: seekerUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const axiosCompany = axios.create({
    baseURL: companyUrl,
    withCredentials: true,
    headers: {
          'Content-Type': 'application/json'
    }
})



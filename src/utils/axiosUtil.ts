import axios from 'axios'

const seekerUrl = 'http://localhost:9009/api/seeker'
const companyUrl = 'http://localhost:9009/api/company'
const adminUrl = 'http://localhost:9009/api/admin'



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

export const axiosAdmin = axios.create({
    baseURL: adminUrl,
    withCredentials: true,
    headers: {
         'Content-Type': 'application/json'
    }
})

// axiosSeeker.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       if (error.response) {
 
//         setTimeout(() => {
//           window.location.href = "/seeker/login"; 
//         }, 1500);
//       }
   
//       return Promise.reject(error);
//     }
//   );

// axiosCompany.interceptors.response.use(
//     (response) => {
//       return response;
//     },
//     (error) => {
//       if (error.response) {
 
//         setTimeout(() => {
//           window.location.href = "/employer/login"; 
//         }, 1500);
//       }
   
//       return Promise.reject(error);
//     }
//   );





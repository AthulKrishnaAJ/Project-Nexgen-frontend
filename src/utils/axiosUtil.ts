import axios from 'axios'
import store from '../redux/store'
import httpStatus from './httpStatus'
import { clearAdminState, updateAdminToken } from '../redux/slices/adminSlice'
import { clearCompanyState, updateCompanyToken } from '../redux/slices/companySlice'
import { clearSeekerState, updateSeekerToken } from '../redux/slices/seekerSlice'


const seekerUrl = 'http://localhost:9009/api/seeker'
const companyUrl = 'http://localhost:9009/api/company'
const adminUrl = 'http://localhost:9009/api/admin'


const axiosConfig = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
}

export const axiosSeeker = axios.create({
    ...axiosConfig,
    baseURL: seekerUrl,
})


export const axiosCompany = axios.create({
    ...axiosConfig,
    baseURL: companyUrl,
})


export const axiosAdmin = axios.create({
    ...axiosConfig,
    baseURL: adminUrl,
})



//Seeker
axiosSeeker.interceptors.request.use(
    (config) => {
        const seekerState = store.getState()
        const accessToken = seekerState.seeker.seekerInfo?.accessToken

        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => Promise.reject(error)
)


axiosSeeker.interceptors.response.use (
    (response) => {
        const newAccessToken: string = response.headers?.authorization?.split(' ')[1];
        if(newAccessToken){
            store.dispatch(updateSeekerToken(newAccessToken))
        }
        return response
    },
    (error) => {
        if(error.response?.status === (httpStatus.UNAUTHORIZED || httpStatus.FORBIDDEN)){
         store.dispatch(clearSeekerState())
            // setTimeout(() => {
            //     window.location.href = '/login'
            // }, 1000)
        }
        return Promise.reject(error)
    }
)



//Company
axiosCompany.interceptors.request.use(
    (config) => {
        const companyState = store.getState()
        const accessToken = companyState.company.employerInfo?.accessToken

        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => Promise.reject(error)
)


axiosCompany.interceptors.response.use(
    (response) => {
        const newAccessToken: string = response.headers?.authorization?.split(' ')[1];
        if(newAccessToken){
            store.dispatch(updateCompanyToken(newAccessToken))
        }
        return response
    },
    (error) => {
        if(error.response?.status === (httpStatus.UNAUTHORIZED || httpStatus.FORBIDDEN)){
            store.dispatch(clearCompanyState())
            // setTimeout(() => {
            //     window.location.href = '/employer/login'
            // }, 1000)
        }
        return Promise.reject(error)
    }
)



// Admin
axiosAdmin.interceptors.request.use(
    (config) => {
        const adminState = store.getState()

        const token = adminState.admin.adminInfo?.accessToken
       
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error: any) => Promise.reject(error)
)


axiosAdmin.interceptors.response.use(
    (response) => {
        const newAccessToken: string = response.headers?.authorization?.split(' ')[1];
        if(newAccessToken){
            store.dispatch(updateAdminToken(newAccessToken))
        }
        return response
    },
    (error) => {
        if(error.response?.status === (httpStatus.UNAUTHORIZED || httpStatus.FORBIDDEN)){
            store.dispatch(clearAdminState())
            // setTimeout(() => {
            //     window.location.href = '/admin/login'
            // }, 1000)
        }
        return Promise.reject(error)
    }
)







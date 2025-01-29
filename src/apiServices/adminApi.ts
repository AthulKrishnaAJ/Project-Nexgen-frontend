import { axiosAdmin } from "../utils/axiosUtil";
import {toast} from 'sonner'

//Seekers
export const getAllSeekersService = async (): Promise<any> => {
    try{
        const response = await axiosAdmin.get('/getAllSeekers')
        return response
    } catch(error: any){
        console.error('Error in getAllUsers at admin api service: ', error)
        const message = error.response?.data?.message
        toast.error(message)
    }
}


export const seekerBlockUnblockService = async (id: string, action: string): Promise<any> => {
    try {
        const response = await axiosAdmin.post('/blockUnblockSeeker', {id, action})
        console.log('Success response in seekerBlockUnblockService at adminApi service: ', response)
        return response
    } catch (error: any) {
        console.error('Error in seekerBlockUnblockSerive at adminApi service: ', error)
        const message = error.response?.data?.message
        toast.error(message)
    }
}


//Companies
export const getAllCompaniesService = async (): Promise<any> => {
    try {
        const response = await axiosAdmin.get('/getAllCompanies')
        return response
    } catch (error: any) {
        console.error('Error in getAllCompaniesService at adminApi service: ', error)
        const message = error.response?.data?.message
        toast.error(message)
    }
}

export const companyVerificationSerivce = async (email: string, action: string, reason?: string): Promise<any> => {
    try {
        const response = await axiosAdmin.post('/companyVerification', {email, action, reason})
        console.log('Success response in companyVerificationSerivce at adminApi service: ', response)
        return response
    } catch (error: any) {
        console.error('Error in verificationCompanyService at adminApi service: ', error)
        const message = error.response?.data?.message
        toast.error(message)
    }
}
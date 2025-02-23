//Files
import { axiosCompany } from "../utils/axiosUtil";
import httpStatus from "../utils/httpStatus";

//Types and interfaces
import { EmployerPrimaryDetailsState } from "../types/company/companyTypes";
import { JobPostState } from "../types/company/comapanyInterfaces";
import { VerifyOtpPayloads, EmailWithPasswordState } from "../types/common/commonTypes";

//Styles and Icons
import { toast } from "sonner"

export const signupEmployer = async (employerData: EmployerPrimaryDetailsState): Promise<any> => {
    try {
        const response = await axiosCompany.post('/signup', employerData)
        console.log('reponse after employer signup form submission: ', response)
        return response
    } catch (error: any) {
        console.error('Error in signupEmployer at companyApi: ', error)
        const {data, status} = error.response
        if(status === httpStatus.CONFLICT){
            toast.warning(data.message)
        } else {
            toast.error(data.message)
        } 
    }
}


export const employerVerifyOtp = async (payload: VerifyOtpPayloads, url: string): Promise<any> => {
    try {
        const response = await axiosCompany.post(url, payload)
        return response.data
    } catch (error: any) {
        console.log('Error in employerVerifyOtp at companiApi service: ', error)
        toast.error(error?.response?.data?.message)
        
    } 
}

export const employerForgotPasswordEmailVerifyService = async (email: string): Promise<any> => {
    try {
        const response = await axiosCompany.post('/emailVerify', {email})
        return response
    } catch (error: any) {
        console.error('Error in employerForgotPasswordEmailVerifyService after email submission: ', error)
        let message = error.response?.data?.message
        toast.error(message)
    }
}


export const employerChangePasswordSerivce = async (payload: EmailWithPasswordState) => {
    try {

        const response = await axiosCompany.post('/changePassword', payload)
        return response
    } catch (error: any) {
        console.log('Error in employerChangePasswordService at companyApi: ', error)
        toast.error(error?.response?.data?.message)
    }
}


export const companyJobPostService = async (payload: JobPostState) => {
    try {
        const response = await axiosCompany.post('/jobPost', payload)
        return response
    } catch (error: any) {
        console.error('Error in companyJobPostService at companyApi: ', error)
        toast.error(error?.response?.data?.message)
    }
}


export const fetchJobDetails = async (companyId: string) => {
    try {
        const response = await axiosCompany.get(`/getJobs/${companyId}`)
        return response
    } catch (error:any) {
        console.error('Error in fetchJobDetails at companyApi: ', error)
        toast.error(error?.response?.data?.message)
    }
}


export const changeJobStatusService = async (jobId: string, status: string) => {
    try {
        const response = await axiosCompany.post('/changeJobStatus', {jobId, status})
        return response
    } catch (error: any) {
        console.error('Error in changeJobStatusService at companyApi: ', error)
        toast.error(error?.response?.data?.message)
    }
}
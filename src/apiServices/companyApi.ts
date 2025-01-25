//Files
import { axiosCompany } from "../utils/axiosUtil";
import httpStatus from "../utils/httpStatus";

//Types and interfaces
import { EmployerPrimaryDetailsState } from "../types/company/companyTypes";
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
        } else if (status === httpStatus.INTERNAL_SERVER_ERROR){
            toast.error(data.message)
        } 
    }
}


export const employerVerifyOtp = async (payload: VerifyOtpPayloads, url: string): Promise<any> => {
    try {
        const response = await axiosCompany.post(url, payload)
        console.log('Response from after otp submission: ', response)
        return response.data
    } catch (error: any) {
        console.log('Error in verifyOtp at seeker Api service: ', error)
        const {data, status} = error?.response
        if(status === httpStatus.CONFLICT){
            toast.warning(data.message)
        } else {
            toast.error(data.message)
        }
        
    } 
}

export const employerForgotPasswordEmailVerifyService = async (email: string): Promise<any> => {
    try {
        const response = await axiosCompany.post('/emailVerify', {email})
        console.log('Response in employerForgotPasswordEmailVerifyService after email submission: ', response)
        return response
    } catch (error: any) {
        console.error('Error in employerForgotPasswordEmailVerifyService after email submission: ', error)
        let message = error.response?.data?.message
        toast.error(message)
    }
}


export const employerChangePasswordSerivce = async (payload: EmailWithPasswordState) => {
    try {
        console.log('payloadssssss: ', payload)
        const response = await axiosCompany.post('/changePassword', payload)
        console.log('Response in employerChangePasswordSerivce after changing password: ', response)
        return response
    } catch (error: any) {
        console.log('Error in employerChangePasswordService at companyApi: ', error)
        let message = error.response?.data?.message
        toast.error(message)
    }
}
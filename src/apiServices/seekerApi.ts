
// types and interface
import { UserPrimaryDetailsState } from "../types/seeker/seekerTypes"
import { VerifyOtpPayloads, ChangePasswordState } from "../types/common/commonTypes"


//Files
import { axiosSeeker } from "../utils/axiosUtil"
import httpStatus from "../utils/httpStatus"

//Styles and Icons
import { toast } from "sonner"


export const signupSeeker = async (userData: UserPrimaryDetailsState, setLoading: (loading: boolean) => void): Promise<any> => {
    try{
        console.log('user data in signup user api page: ', userData)
        const response = await axiosSeeker.post('/signup', userData)
        return response
    }catch(error: any){
        console.log('Error in signupSeeker at seeker Api services: ', error)
        const {data, status} = error.response
        if(status === httpStatus.CONFLICT){
            toast.warning(data.message)
        } else if (status === httpStatus.INTERNAL_SERVER_ERROR){
            toast.error(data.message)
        } 
       
    } finally {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }
}



export const resendOtp = async (email: string | null): Promise<any> => {
    try {
        console.log('Email at resend otp: ', email);
        const response = await axiosSeeker.post('/resendOtp', {email})
        console.log('Response in resendOtp after resending at seeker Api service => ', response)
        return response
    } catch (error: any) {
        console.log('Error in resendOtp at seeker Api sevice: ', error)
        const {data, status} = error.response
        if(status === httpStatus.NOT_FOUND){
            toast.error(data.message)
        } else if(status === httpStatus.INTERNAL_SERVER_ERROR){
            toast.error(data.message)
        }
       
    }
}


export const verifyOtp = async (payload: VerifyOtpPayloads, url: string): Promise<any> => {
    try {
        console.log('URL of otp verification: ', url)
        const response = await axiosSeeker.post(url, payload)
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


export const forgotPassEmailVerify = async (email: string): Promise<any> => {
    try {
        const response = await axiosSeeker.post('/emailVerify', {email})
        console.log('Response from forgotPasswordEmailVerify after email submission: ', response)
        return response
    } catch (error: any) {
        console.error('Error in forgotPasswordEmailVerify: ', error)
        const {data} = error.response
        toast.error(data.message)
    }
}


export const changePasswordService = async (datas: ChangePasswordState): Promise<any> => {
    try {
        const response = await axiosSeeker.post('/changePassword', datas)
        console.log('Response changePasswordService after password submission: ', response)
        return response
    } catch (error: any) {
        console.error('Error in changePasswordService at seekerApi service: ', error)
        const {data} = error.response
        toast.error(data.message)
    }
}


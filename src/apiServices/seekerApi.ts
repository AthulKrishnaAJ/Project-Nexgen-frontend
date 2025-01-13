
// types
import { UserPrimaryDetailsState, VerifyOtpPayloads } from "../types/seeker/seekerTypes"

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


export const verifyOtp = async (payload: VerifyOtpPayloads): Promise<any> => {
    try {
        const response = await axiosSeeker.post('/verifyOtp', payload)
        console.log('Response from after otp submission: ', response)
        return response.data
    } catch (error: any) {
        console.log('Error in verifyOtp at seeker Api service: ', error)
        const {data, status} = error?.response
        if(status === httpStatus.BAD_REQUEST){
            toast.error(data.message)
        } else if(status === httpStatus.CONFLICT) {
            toast.warning(data.message)
        } else {
            toast.error(data.message)
        }
        
    } 
}
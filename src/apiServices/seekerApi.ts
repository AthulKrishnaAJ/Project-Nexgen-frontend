
// types and interface
import { UserPrimaryDetailsState } from "../types/seeker/seekerTypes"
import { VerifyOtpPayloads, EmailWithPasswordState } from "../types/common/commonTypes"
import { SkillServiceProps, ResumeServiceProps, JobApplyServiceProps } from "@/types/seeker/seekerInterfaces"
import { GoogleAuthServiceProps } from "@/types/common/commonInterfaces"

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
        toast.error(error.response?.data?.message)
    }
}


export const changePasswordService = async (datas: EmailWithPasswordState): Promise<any> => {
    try {
        const response = await axiosSeeker.post('/changePassword', datas)
        console.log('Response changePasswordService after password submission: ', response)
        return response
    } catch (error: any) {
        console.error('Error in changePasswordService at seekerApi service: ', error)
        toast.error(error.response?.data?.message)
    }
}


export const fetchSeekerDetailsService = async (seekerId: string): Promise<any> => {
    try {
        const response = await axiosSeeker.get(`/getSeeker/${seekerId}`)
        return response
    } catch (error: any) {
        console.error('Error in fetchSeekerDetailsService at seekerApi service: ', error)
        toast.error(error.response?.data?.message)
        
    }
}


export const fetchAllJobsService = async () => {
    try {
        const response = await axiosSeeker.get('/getJobs')
        return response
    } catch (error: any) {
        console.error('Error in fetchAllJobsService at seekerApi service: ', error)
        toast.error(error.response?.data?.message)
    }
}


export const fetchAllCompanyService = async () => {
    try {
        const response = await axiosSeeker.get('/getCompanies')
        return response
    } catch (error: any) {
        console.error('Error in fetchAllCompanyService at seekerApi service: ', error)
        toast.error(error.response?.data?.message)

    }
}


export const uploadResumeService = async (formData: FormData) => {
    try {
        const response = await axiosSeeker.post('/uploadResume', formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        return response
    } catch (error: any) {
        console.error('Error in uploadResumeService at seekerApi service: ', error)
        if(error.response?.status === httpStatus.CONFLICT){
            toast.warning(error.response?.data?.message)
        } else {
            toast.error(error.response?.data?.message)
        }
        
    }
}


export const addSkillsService = async (data: SkillServiceProps) => {
    try {
        const response = await axiosSeeker.post('/addSkill', data)
        return response
    } catch (error: any) {
        console.error('Error in addSkillsService at seekerApi service: ', error)
        toast.error(error.response?.data?.message)
    }
}


export const deleteSkillService = async (data: SkillServiceProps) => {
    try {
        const response = await axiosSeeker.delete('/removeSkill', {
            data: data
        })
        return response
    } catch (error: any) {
        console.error('Error in deleteSkillService at seekerApi service: ', error)
        toast.error(error.response?.data?.message)
    }
}

export const deleteResumeService = async (data: ResumeServiceProps) => {
    try {
        const response = await axiosSeeker.put('/removeResume', data)
        return response
    } catch (error: any) {
        console.error('Error in deleteResumeService at seekerApi service: ', error)
        toast.error(error.response?.data?.message)
    }
}

export const appyJobService  = async (data: JobApplyServiceProps) => {
    try {
        const response = await axiosSeeker.post('/applyJob', data)
        return response
    } catch (error: any) {
        console.error('Error in appyJobService at seekerApi service: ', error)
        toast.error(error.response?.data?.message)
    }
}


export const fetchSearchJobService = async (searchTerm: string, searchType: string) => {
    try {
        const response = await axiosSeeker.get('/searchJob', {
            params: {searchTerm, searchType}
        })
        return response
    } catch (error: any) {
        console.error('Error in fetchSearchJobService at seekerApi service: ', error)
        toast.error(error.response?.data?.message)
    }
}




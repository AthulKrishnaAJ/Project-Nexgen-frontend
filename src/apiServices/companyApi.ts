//Files
import { axiosCompany } from "../utils/axiosUtil";
import httpStatus from "../utils/httpStatus";

//Types and interfaces
import { EmployerPrimaryDetailsState } from "../types/company/companyTypes";
import { VerifyOtpPayloads } from "../types/common/commonTypes";

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


export const employerVerifyOtp = async (payload: VerifyOtpPayloads): Promise<any> => {
    try {
        const response = await axiosCompany.post('/verifyOtp', payload)
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
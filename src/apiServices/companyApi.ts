//Files
import { axiosCompany } from "../utils/axiosUtil";
import httpStatus from "../utils/httpStatus";

//Types and interfaces
import { EmployerPrimaryDetails } from "../types/company/comapanyInterfaces";

export const signupEmployer = async (employerData: EmployerPrimaryDetails): Promise<any> => {
    try {
        const response = await axiosCompany.post('/signup', employerData)
    } catch (error: any) {
        console.error('Error in signupEmployer at companyApi: ', error)
    }
}
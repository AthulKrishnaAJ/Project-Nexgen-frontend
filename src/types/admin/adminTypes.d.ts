export type SeekerPrimaryType = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    blocked: boolean;
    status?:string
}

export type CompanyPrimaryTypeForAdmin = {
    _id: string;
    companyName: string;
    industry: string;
    email: string;
    mobile: string;
    blocked: string;
    verify: string;
    rejection?: {
        expiryDate?: Date;
        reason?: string
    }
}


export type CompanyPrimaryDataForAdminList = {
    _id: string;
    companyName: string;
    industry: string;
    email: string;
    mobile: string;
    blocked: string;
    verify: string;
}


export interface EmployerStorePrimaryState {
    _id: string;
    companyName: string;
    industry: string;
    email: string;
    mobile: string;
    blocked: boolean;
    verify: string;
}

export interface EmployerPrimaryState {
    employerInfo: EmployerStorePrimaryState | null
}
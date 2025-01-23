export interface EmployerStorePrimaryState {
    employerId: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    blocked: boolean
}

export interface EmployerPrimaryState {
    employerInfo: EmployerStorePrimaryState | null
}
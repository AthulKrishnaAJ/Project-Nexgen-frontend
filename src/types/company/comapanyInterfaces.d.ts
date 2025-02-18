export interface EmployerStorePrimaryState {
    _id: string;
    companyName: string;
    industry: string;
    email: string;
    mobile: string;
    blocked: boolean;
    verify: string;
    accessToken?: string;
    role?: string;
}

export interface EmployerPrimaryState {
    employerInfo: EmployerStorePrimaryState | null
}

export interface JobPostState {
    companyId: string;
    title: string;
    location:string;
    employmentType: string;
    workMode: string;
    minSalary:string;
    maxSalary: string;
    skills:string[];
    requirements: string[];
    benefits:string[];
    description: string;      
}
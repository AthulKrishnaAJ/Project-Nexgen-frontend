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
    minExperience:string;
    maxExperience:string;
    skills:string[];
    requirements: string[];
    benefits:string[];
    description: string;      
}

export interface JobListingState {
    id: string;
    title: string;
    location: string;
    workMode: string;
    status: string;
}

export interface LocationForJob {
    state: string;
    district: string;
}


export interface JobApplicationsWithJobState {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    seekerId: string;
    jobId: {
        _id: string;
        title: string;
        description: string;
        state: string;
        district: string;
        employmentType: 'Full-time' | 'Part-time' | 'Internship';
        workMode: 'On-site' | 'Hybrid' | 'Remote';
        salaryRange: {min: string, max: string};
        experience: {min: string, max: string};
        skills: string[];
        requirements: string[];
        benefits: string[];
        jobApplications: string[] | [];
        companyId: string;
        status: 'open' | 'closed'
        createdAt:string;
    };
    companyId: string;
    status: "Pending" | "Shortlisted" | "Hired" | "Rejected";
    resume: string;
    coverLetter?: string;
    appliedAt: string;
    createdAt:string;
  }


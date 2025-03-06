export interface SeekerStorePrimaryState {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile?: string;
    blocked: boolean;
    logo?: string | null;
    accessToken?: string;
    role?: string
}


export interface SeekerPrimaryState {
    seekerInfo: SeekerStorePrimaryState | null
}

export interface SeekerEditProfileState {
    firstName: string;
    lastName: string;
    mobile: string;
    dateOfBirth: string;
    pincode: string;
    state: string;
    city: string;
    gender: string;
    bio: string;
}

export interface SeekerEditProfilePayload {
    seekerId: string;
    seekerData: SeekerEditProfileState
}

export interface SeekerProfileDatas {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password?: string;
    blocked?: boolean
    logo?: string;
    accessToken?: string
    role?: string
    dateOfBirth?: string;
    gender?: string;
    pincode?:string;
    city?: string;
    state?: string;
    bio?: string;
    resume?: string[];
    skills?: string[];
    certifications?: string[] | [];
    experience?:SeekerExperienceRule[] | [];
    educations?:SeekerEducationRule[] | [];
    resumeFiles?: { fileKey: string, base64: string }[]
}

export interface SeekerExperienceRule {
    jobTitle: string;
    companyName: string;
    location: string;
    startDate: Date;
    endDate: Date;
    reasonForLeaving: string;
}

export interface SeekerEducationRule {
    qualification: string;
    institution: string;
    fieldOfStudy: string;
    startDate: Date;
    endDate: Date;
}


export interface ResumeFile {
    fileKey: string;
    base64: string;
  }

export interface ResumeProps {
    seekerId: string;
    resumeFiles: ResumeFile[]
    onUploadSuccess: () => void
}

export interface SkillServiceProps{
    seekerId: string;
    skill: string
}

export interface SkillComponentProps {
    seekerId: string;
    allSkills: string[];
    onUploadSuccess: () => void
}

export interface ResumeServiceProps {
    seekerId: string;
    fileName: string;
}

export interface JobApplyServiceProps {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    jobId: string;
    companyId: string;
    seekerId: string;
    resume: string;
    coverLetter: string;
}

export interface SearchBarProps {
    onSearch: (searchTerm: string, location: string) => void;
    title: string;
  }
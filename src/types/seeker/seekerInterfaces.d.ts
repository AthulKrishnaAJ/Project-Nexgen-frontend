export interface SeekerStorePrimaryState {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
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
    certifications?: string[] | [];
    experience?:SeekerExperienceRule[] | [];
    educations?:SeekerEducationRule[] | [];
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
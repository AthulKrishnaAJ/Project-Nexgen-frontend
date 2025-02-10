export interface SeekerStorePrimaryState {
    seekerId: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    blocked: boolean
    accessToken?: string;
    role?: string
}


export interface SeekerPrimaryState {
    seekerInfo: SeekerStorePrimaryState | null
}
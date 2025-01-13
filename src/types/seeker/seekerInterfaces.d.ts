export interface SeekerStorePrimaryState {
    seekerId: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    blocked: boolean
}


export interface SeekerPrimaryState {
    seekerInfo: SeekerStorePrimaryState | null
}
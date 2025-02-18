interface AdminStorePrimaryState {
    email: string;
    role: string;
    accessToken: string;
    
}

export interface AdminPrimaryState {
    adminInfo: AdminStorePrimaryState | null
}
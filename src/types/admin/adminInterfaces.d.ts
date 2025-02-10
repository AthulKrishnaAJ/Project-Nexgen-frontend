interface AdminStorePrimaryState {
    email: string;
    role: string;
    accessToken: string;
    refreshToken: string;
}

export interface AdminPrimaryState {
    adminInfo: AdminStorePrimaryState | null
}
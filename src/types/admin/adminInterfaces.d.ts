interface AdminStorePrimaryState {
    email: string 
}

export interface AdminPrimaryState {
    adminInfo: AdminStorePrimaryState | null
}
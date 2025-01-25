

export type UserPrimaryDetailsState = {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
}


export type ChangePasswordState = {
    email: string;
    password: string;
    confirmPassword: string;
}

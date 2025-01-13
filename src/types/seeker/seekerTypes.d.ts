export type passwordTogglingState = {
    [key: string]: {
        type: string;
        icon: JSX.Element;
    }
}


export type UserPrimaryDetailsState = {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
}


export type VerifyOtpPayloads = {
    email: string | null;
    otp: string
}

export type LoginState = {
    email: string;
    password: string
}
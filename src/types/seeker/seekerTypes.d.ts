export type passwordTogglingState = {
    [key: string]: {
        type: string;
        icon: JSX.Element;
    }
}


export type userPrimaryDetailsState = {
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
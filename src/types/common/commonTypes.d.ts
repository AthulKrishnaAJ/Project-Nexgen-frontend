import React from "react";
import store from "../../redux/store";

export type clickSpanEvent = React.MouseEvent<HTMLSpanElement>;
export type keyboardEvent = React.KeyboardEvent<HTMLInputElement>
export type formEvent = React.FormEvent<HTMLFormElement>

export type LoadedProps = {
    size: number
}

export type VerifyOtpPayloads = {
    email: string | null;
    otp: string
}

export type LoginState = {
    email: string;
    password: string
}


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



export type ChangePasswordState = {
    email: string;
    password: string;
    confirmPassword: string;
}

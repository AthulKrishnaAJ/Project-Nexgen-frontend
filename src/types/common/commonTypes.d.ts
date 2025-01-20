import React from "react";

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
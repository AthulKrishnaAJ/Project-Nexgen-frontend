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

export type EmailWithPasswordState = {
    email: string;
    password: string
}


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export type passwordTogglingState = {
    [key: string]: {
        type: string;
        icon: JSX.Element;
    }
}


export type SubmitButtonProps = {
    loading: boolean;
    text: string
}

export type RowStyle = {
    textColor?: string;
}


type TableAction = {
    label: string;
    callback: (row: any, action: string) => void
    condition: (row: any) => boolean,
    buttonStyle: {
        bgColor: string
        hoverColor: string
    },
    disabled?:(company: any) => boolean
}

export type TableProps = {
    data: any[];
    fields: {key: string; label: string}[];
    actions: TableAction[];
    rowsPerPageOptions?: number[]; 
    defaultRowsPerPage?: number;
    rowStyle?: (row: any) => RowStyle;
}

export type InputModalProps = {
    isVisible: boolean;
    title: string
    onClose: () => void;
    onSubmit: (data: any, action: string, reason?: string) => void;
    data?: any;
    action?: string;
}

export type ConfirmModalType = {
    message: string;
    header?: string;
    acceptLabel?: string;
    rejectLabel?: string;
    onConfirm: () => void;
}

export type CustomFooterProps = {
    onAccept: () => void;
    onReject: () => void;
  }
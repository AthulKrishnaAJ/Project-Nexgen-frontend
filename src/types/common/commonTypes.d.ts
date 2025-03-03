import React from "react";
import store from "../../redux/store";

export type clickSpanEvent = React.MouseEvent<HTMLSpanElement>;
export type keyboardEvent = React.KeyboardEvent<HTMLInputElement>
export type formEvent = React.FormEvent<HTMLFormElement>
export type changeEvent = React.ChangeEvent<HTMLInputElement>

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

//Store and dispatch type
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
        hoverClass?: string
    },
    disabled?: (company: any) => boolean
}

export type TableProps = {
    data: any[];
    fields: { key: string; label: string }[];
    actions: TableAction[];
    rowsPerPageOptions?: number[];
    defaultRowsPerPage?: number;
    rowStyle?: (row: any) => RowStyle;
}

export type InputModalProps = {
    isVisible: boolean;
    title: string;
    loading: boolean;
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


export type ConfirmPopProps = {
    action?: string;
    description?: string
    buttonText?: string;
    buttonColor: string;
    hoverClass?: string;
    callback: (row: any, action: string) => void;
    data?: any
    buttonDisabler?: boolean

}


export type FooterProps = {
    socialLinks: { icon: React.ReactNode, link: string }[];
    useFullLinks: { text: string, link: string }[];
    information: { text: string, link: string }[];
}


export type AlertDialogProps = {
    title: string;
    description: string;
    onConfirm: () => void;
    confirmLabel: string;
    cancelLabel?: string;
    open: boolean;
    openChange: (open: boolean) => void
}



export type DropDownProps = {
    menuLabel: string;
    menuNavigations: { label: string; link: string }[];
    menuExicutors: { label: string; icon: JSX.Element; exicutor: () => void }[];
    triggerElement: JSX.Element
}

type Column = {
    key:string;
    label:string;
}
export type TableProp<T> = {
    columns: Column[]
    data: T[]
}



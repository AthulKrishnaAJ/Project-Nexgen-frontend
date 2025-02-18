import React from "react";

export type EmployerPrimaryDetailsState = {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
}


export type ArraySetState = React.Dispatch<React.SetStateAction<string[]>>
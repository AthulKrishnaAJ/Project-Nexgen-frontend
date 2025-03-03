import React from "react";

export type EmployerPrimaryDetailsState = {
    companyName: string;
    industry: string;
    email: string;
    mobile: string;
    foundedAt: Date | string;
    state: string;
    district: string;
    password: string;
}


export type ArraySetState = React.Dispatch<React.SetStateAction<string[]>>
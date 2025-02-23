import React from "react";

export interface JobsRuleType {
    _id: string;
    title: string;
    description: string;
    location: string;
    employmentType: 'Full-time' | 'Part-time' | 'Internship';
    workMode: 'On-site' | 'Hybrid' | 'Remote';
    salaryRange: {min: string, max: string};
    experience: {min: string, max: string};
    skills: string[];
    requirements: string[];
    benefits: string[];
    jobApplications?: string[] | [];
    companyId: string;
    status: 'open' | 'closed'
    companyName?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?:number;

}

export interface JobPropsToCard {
    job: {
        _id: string;
        companyName?: string;
        logo?: string;
        title: string;
        location: string;
        workMode: string;
        salaryRange: {
            min: string;
            max: string;
        }
        timeAgo: string;

    }
    buttons?: React.ReactNode
}


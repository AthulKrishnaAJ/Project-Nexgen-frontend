import React from 'react'

//Components
import { 
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

import { 
    Avatar,
    AvatarFallback,
    AvatarImage
 } from '../ui/avatar';

 import { Button } from '../ui/button';


 //Styles and icons
 import { CiLocationOn } from "react-icons/ci";



//Types and interfaces
import { JobPropsToCard } from '@/types/common/commonInterfaces';

const JobCard: React.FC<JobPropsToCard> = ({job, buttons}) => {

  return (
    <Card className='w-full md:w-80 rounded-md flex flex-col justify-between'>
        <CardHeader className='pb-3'>
            <div className='flex items-center mb-2'>
                <Avatar className='w-8 h-8'>
                    <AvatarImage src='https://github.com/shadcn.png' alt='@nexgen'/>
                    <AvatarFallback>NX</AvatarFallback>
                </Avatar>
                <CardDescription className='ml-2'>{job.companyName}</CardDescription>
            </div>
            <CardTitle>{job.title}</CardTitle>
        </CardHeader>

        <CardContent className='space-y-1'>
            <p className='flex items-center text-gray-600 text-sm'>
            <CiLocationOn className="mr-1" /> {job.location}, ({job.workMode})
            </p>
            <p className='text-xs ml-1 text-gray-600'>
                {job.salaryRange.min} - {job.salaryRange.max} per month
            </p>
        </CardContent>

        <CardFooter className="flex justify-between items-center">
            {buttons}
            <span className="text-xs text-gray-600">{job.timeAgo}</span>
      </CardFooter>

    </Card>
  )
}

export default JobCard



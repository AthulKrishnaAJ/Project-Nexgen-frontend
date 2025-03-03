import React from 'react'

//Components
import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";

import { 
    Avatar,
    AvatarFallback,
    AvatarImage
 } from '../ui/avatar';

 //Types and interfaces
 import { CompanyDataToCard } from '@/types/common/commonInterfaces';

 //Styles and icons
 import { CiLocationOn } from 'react-icons/ci';
 import { LiaIndustrySolid } from "react-icons/lia";
 import { RiVerifiedBadgeFill } from "react-icons/ri";

 

const CompanyCard: React.FC<CompanyDataToCard> = ({company, buttons}) => {

  return (
    <Card className='w-52 md:w-60 flex flex-col items-center text-center'>
        <CardHeader className='flex flex-col items-center pb-2'>
            <Avatar className='w-14 h-14'>
                <AvatarImage src='https://github.com/shadcn.png' alt='@nexgen'/>
                <AvatarFallback>NX</AvatarFallback>
            </Avatar>
        </CardHeader>


        <CardContent className='w-full flex flex-col items-start text-left space-y-2'>
        <CardTitle className='flex items-center text-lg font-semibold gap-2'>
            {company.companyName}
            {company.verify === 'accept' && (
                <RiVerifiedBadgeFill size={16} className='text-themeColor'/>
            )}
        </CardTitle>
            <p className='flex items-center text-gray-600 text-sm gap-2'>
               <LiaIndustrySolid/> {company.industry}
            </p>
            <p className='flex items-center text-gray-600 text-xs gap-2'>
               <CiLocationOn/> {company.state}, {company.district}
            </p>
            
        </CardContent>

        <CardFooter className='w-full flex justify-end'>
          {buttons}
        </CardFooter>
    </Card>
  )
}

export default CompanyCard

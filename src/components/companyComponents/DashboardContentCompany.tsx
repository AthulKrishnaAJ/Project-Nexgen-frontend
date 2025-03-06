import React from 'react'
import { Link } from 'react-router-dom'

//Styles and icons
import hiringImg from '../../assets/hiringTeamImg.png'
import { Button } from 'antd'



const DashboardContentCompany: React.FC = () => {
  return (
    <div className='p-6'>
        <h1 className='text-2xl font-semibold text-gray-700'>Dashboard</h1>
      <div className='flex justify-start'>
        <img src={hiringImg} alt="Image" 
        className='w-[300px] sm:w-[400px] md:w-[400px] h-auto max-w-full'
        />
        <div className='flex-col justify-between h-full self-center '>
            <div>
                <p className='text-2xl font-semibold text-gray-800'>
                    Find the Perfect Candidates for Your Company
                    </p>
                <p className='text-gray-600 italic'>
                    Great vision without great people is irrelevant
                    </p>
            </div>
          <Button className='mt-10 bg-gray-900 text-white pb-1 secondary-btn shadow-md'>
            <Link to='/employer/jobForm'>Post a job</Link>
          </Button>

        </div>
      </div>
    </div>
  )
}

export default DashboardContentCompany

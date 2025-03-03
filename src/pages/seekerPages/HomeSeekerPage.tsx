import React, {useState, useEffect} from 'react'

import { calculateTimeAgo } from '@/utils/dateFormation'


//Api's
import { fetchAllJobsService, fetchAllCompanyService } from '@/apiServices/seekerApi'

//Components
import JobCard from '@/components/commonComponents/JobCard'
import CompanyCard from '@/components/commonComponents/CompanyCard'
import { Button } from '@/components/ui/button'

//Styles and icons
import bannerImg1 from '../../assets/homeBanner1.png'
import bannerImg2 from '../../assets/homeBanner2.jpg'
import {toast} from 'sonner'

//Types and interfaces
import { JobsRuleType, CompanyAllDetailsState } from '@/types/common/commonInterfaces'

const HomeSeekerPage: React.FC = () => {

  const [allJobs, setAllJobs] = useState<JobsRuleType[] | [] >([])
  const [allCompanies, setAllCompanies] = useState<CompanyAllDetailsState[] | []>([])


  useEffect(() => {
        const getJobs = async () => {
            try {
                const response = await fetchAllJobsService()
                if(response?.data?.status){
                    setAllJobs(response.data.jobs)
                }
            } catch (error: any) {
                console.error('Error in find all jobs in Home seeker Page: ', error)
                toast.error('An unexpected error occured')
            }
        }

        const getCompany = async () => {
            try {   
                const response = await fetchAllCompanyService()
                if(response?.data?.status){
                    setAllCompanies(response.data.companies)
                }
            } catch (error: any) {
                console.error('Error in find all companies in Home seeker Page: ', error)
                toast.error('An unexpected error occured')
            }
        }
        getJobs()
        getCompany()
  }, [])

  return (
    <div>
        {/* First banner */}
      <div className='relative w-full h-[500px]'>
        <img 
        src={bannerImg1}
        alt="Banner" 
        className="w-full h-full object-cover opacity-80"
        />
        <div className='absolute top-0 left-0 w-full h-full bg-black/60'></div>

        <div className='absolute inset-32 flex-col self-center text-white'>
            <h1 className='text-3xl font-bold md:text-4xl'>
                Find Your Dream Job Today
            </h1>
            <p className='mt-2 text-lg md:text-xl font-marcellus font-medium'>
            Browse through thousands of job opportunities and take the next step in your career.
            </p>
            <Button className='mt-2 bg-themeColor hover:bg-hoverThemeColor'>
                Explore Jobs
            </Button>
        </div>
      </div>
        {/* Job listing */}
      <div className='mt-14 flex flex-col items-center'>
        <h2 className='text-2xl font-semibold text-center mb-14'>Our Jobs</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 py-4 gap-10 '>
            {allJobs.length > 0 && (
                allJobs.slice(0, 6).map((job) => (
                    <JobCard
                        key={job._id}
                        job={{...job, timeAgo: calculateTimeAgo(job.createdAt as string) as string}}
                        buttons={(
                            <Button
                            className='h-8 bg-white border border-gray-800 text-gray-800
                             hover:bg-gray-800 hover:text-white transition-colors duration-300'
                            >
                                Apply now
                            </Button>
                        )}
                    />
                ))
            )}
        </div>
      </div>
        {/* Second banner */}
      <div className='relative mt-10 w-full h-[300px]'>
        <img 
        src={bannerImg2} 
        alt='Banner' 
        className='w-full h-full object-cover bg-opacity-100'
        />
        <div className='absolute top-0 left-0 w-full h-full bg-black/40'></div>
      </div>

        {/* Company listing */}
      <div className='my-14 flex flex-col items-center'>
        <h2 className='text-2xl font-semibold text-center mb-14'>Our Companies</h2>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-10'>
            {allCompanies.length > 0 && (
                allCompanies.slice(0, 8).map((company) => (
                    <CompanyCard
                        key={company._id}
                        company={company}
                        buttons={(
                            <Button
                            className='h-8 bg-gray-800 text-white border hover:bg-white 
                             hover:border-gray-800 hover:text-gray-800 transition-colors duration-300'
                            >
                                More
                            </Button>
                        )}
                    />
                ))
            )}
        </div>
      </div>
    </div>
  )
}

export default HomeSeekerPage

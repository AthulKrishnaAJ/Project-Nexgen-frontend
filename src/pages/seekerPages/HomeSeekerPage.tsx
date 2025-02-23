import React, {useState, useEffect} from 'react'

import { calculateTimeAgo } from '@/utils/dateFormation'
//Api's
import { fetchAllJobsService } from '@/apiServices/seekerApi'

//Components
import JobCard from '@/components/commonComponents/JobCard'
import { Button } from '@/components/ui/button'

//Styles and icons
import bannerImg1 from '../../assets/homeBanner2.png'

//Types and interfaces
import { JobsRuleType } from '@/types/common/commonInterfaces'

const HomeSeekerPage: React.FC = () => {

  const [allJobs, setAllJobs] = useState<JobsRuleType[] | [] >([])

  useEffect(() => {
        const getJobs = async () => {
            try {
                const response = await fetchAllJobsService()
                if(response?.data?.status){
                    console.log('Resss : ', response.data.jobs)
                    setAllJobs(response.data.jobs)
                }
            } catch (error: any) {
                console.error('Error in find all jobs in Home seeker Page: ', error)
            }
        }
        getJobs()
  }, [])

  return (
    <div className='main'>
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

      <div className='my-8 flex flex-col items-center'>
        <h2 className='text-2xl font-semibold text-center mb-6'>Top Jobs</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
            {allJobs.slice(0, 6).map((job) => (
                <JobCard
                    key={job._id}
                    job={{...job, timeAgo: calculateTimeAgo(job.createdAt as string) as string}}
                    buttons={(
                        <Button
                        className='bg-white border border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white'
                        >
                            Apply now
                        </Button>
                    )}
                />
            ))}
        </div>
      </div>
    </div>
  )
}

export default HomeSeekerPage

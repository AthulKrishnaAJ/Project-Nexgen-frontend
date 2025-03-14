import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { calculateTimeAgo } from '@/utils/dateFormation'

//Api's
import { fetchAllJobsService, fetchSeekerDetailsService, fetchSearchJobService } from '@/apiServices/seekerApi'

//Types and interfaces
import { JobsRuleType } from '@/types/common/commonInterfaces'
import { RootState } from '@/types/common/commonTypes'
import { SeekerProfileDatas } from '@/types/seeker/seekerInterfaces'

//Styles and icons
import { toast } from 'sonner'

//Components
import JobCard from '@/components/commonComponents/JobCard'
import JobDetailCard from '@/components/commonComponents/JobDetailCard'
import { Button } from '@/components/ui/button'
import ApplicationFormSeeker from '@/components/seekerComponents/ApplicationFormSeeker'
import SearchBarSeeker from '@/components/commonComponents/seeker/SearchBarSeeker'





const JoblistingSeekerPage: React.FC = () => {
    const [allJobs, setAllJobs] = useState<JobsRuleType[]>([])
    const [filteredJobs, setFilteredJobs] = useState<JobsRuleType[]>([])
    const [selectedJob, setSelectedJob] = useState<JobsRuleType | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const seekerInfo = useSelector((state: RootState) => state.seeker?.seekerInfo)
    const [seekerDetails, setSeekerDetails] = useState<SeekerProfileDatas | null>(null)
    const [loading, setLoading] = useState<boolean>(false)


    useEffect(() => {
        const getJobs = async () => {
            try {
                const response = await fetchAllJobsService()
                if (response?.data?.status) {
                    const jobs = response.data.jobs
                    setAllJobs(jobs)
                    setFilteredJobs(jobs)
                    console.log(jobs)
                    if (jobs.length > 0) {
                        setSelectedJob(jobs[0])
                    }

                }
            } catch (error: any) {
                console.error('Error in find all jobs in Home seeker Page: ', error)
                toast.error('An unexpected error occured')
            }
        }
        getJobs()
    }, [])


    const handleSearch = useCallback( async (searchTerm: string, searchType: string) => {
        if (!searchTerm.trim()) {
            setFilteredJobs(allJobs)
            console.log('nothing')
            setSelectedJob(allJobs[0])
            return;
        }
        try {
            const response = await fetchSearchJobService(searchTerm, searchType)
            console.log('Success after searching: ', response)
            if(response?.data?.jobs){
                setFilteredJobs(response.data.jobs)
                setSelectedJob(response.data.jobs[0])
            }
        } catch (error) {
            console.error('Error in handleSearch at joblistigPage: ', error)
        }

    }, [allJobs])


    const handleApply = async () => {
        setLoading(true)
        try {
            const response = await fetchSeekerDetailsService(seekerInfo?._id!)
            if (response?.data) {
                const { resume, resumeFiles, skills } = response.data?.seekerData
                if (resume.length <= 0 || resumeFiles.length <= 0 || skills.length <= 0) {
                    toast.warning('Necessary details are missing in your profile')
                    return
                }
                setSeekerDetails(response.data?.seekerData)
                setIsModalOpen(true)
            }

        } catch (error) {
            console.error('Error in handleAppy fun in joblisting: ', error)
            toast.error('An unexpected error occured')
        } finally {
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }


    }

    return (
        <div className='container mx-auto p-4 md:p-6 lg:p-8'>
            <div className='flex flex-col items-center'>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Find Your Dream Job</h1>
                <SearchBarSeeker onSearch={handleSearch} title='job' />

            </div>
            <div className='flex flex-col lg:flex-row gap-4 mt-6'>
                <div className="w-full lg:w-2/5 bg-white rounded-2xl shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-6 ml-4 text-gray-700">Available Jobs</h2>
                    <div className='max-h-[75vh] overflow-y-auto space-y-3 pr-2'>
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job) => (
                                <JobCard
                                    key={job._id}
                                    job={{ ...job, timeAgo: calculateTimeAgo(job.createdAt!) }}
                                    buttons={
                                        <Button
                                            className={`px-3 py-1 rounded-md text-white text-sm ${selectedJob?._id === job._id ? "bg-themeColor" : "bg-gray-700 hover:bg-gray-800"
                                                }`}
                                            onClick={() => setSelectedJob(job)}
                                        >
                                            View
                                        </Button>
                                    }
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-4">No jobs available</p>
                        )}
                    </div>
                </div>

                <div className="w-full lg:w-3/5 flex justify-center">
                    {selectedJob ? (
                        <JobDetailCard
                            job={selectedJob}
                            buttons={
                                <>
                                    <Button
                                        className={`px-4 py-1 rounded-md text-white bg-gray-700 hover:bg-gray-800
                                                    min-w-[110px] flex justify-center ${loading ? 'bg-gray-500' : ''}`}
                                        onClick={handleApply}

                                    >
                                        <span className="w-full text-center">{loading ? "Wait..." : "Apply here"}</span>
                                    </Button>
                                    <ApplicationFormSeeker
                                        selectedJob={selectedJob}
                                        seekerData={seekerDetails!}
                                        isOpen={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
                                    />
                                </>
                            }
                        />
                    ) : (
                        <div className="bg-white rounded-lg shadow-md p-8 w-full flex items-center justify-center">
                            <p className="text-center text-gray-500">Job details not available</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default JoblistingSeekerPage

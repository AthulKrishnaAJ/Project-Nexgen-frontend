import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../ui/select'


//Api's
import { fetchJobDetails, changeJobStatusService } from '@/apiServices/companyApi'

//Styles and icons
import { toast } from 'sonner'


//Types and Interfaces
import { RootState } from '@/types/common/commonTypes'
import { JobsRuleType } from '@/types/common/commonInterfaces'

//Components
import Table from '../commonComponents/Table'
import { Button } from '../ui/button'
import { CommonComponentLoader } from '@/components/commonComponents/spinner'



const JobListCompany: React.FC = () => {
    const [jobData, setJobData] = useState<JobsRuleType[] | []>([])
    const companyId = useSelector((state: RootState) => state.company?.employerInfo?._id) as string
    const [componentLoading, setComponentLoading] = useState<boolean>(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetchJobDetails(companyId)
                console.log('Response in job listing component: ', response)
                if (response?.data?.jobs) {
                    setJobData(response.data.jobs)
                    setTimeout(() => {
                        setComponentLoading(false)
                    }, 500)
                }
            } catch (error: any) {
                console.error('Error in fetching job details in jobs listing component: ', error.message)
            }
        }
        fetchJobs()
    }, [companyId])


    const columns = [
        { key: 'title', label: 'Title' },
        { key: 'location', label: 'Location' },
        { key: 'workMode', label: 'Work Mode' },
        { key: 'status', label: 'Status' },
        { key: 'actions', label: '' }
    ]


    const handleStatusChange = async (id: string, newStatus: 'open' | 'closed') => {
        try {
            const response = await changeJobStatusService(id, newStatus)
            console.log('REsponse in job listing component after changing status: ', response)
            if (response?.data?.status) {
                toast.success(response.data.message)
                setJobData((prevJobs) =>
                    prevJobs.map((job) =>
                        job._id === id ? { ...job, status: newStatus } : job
                    )
                );
            }
        } catch (error: any) {
            console.error('Error in changing status in job listing component: ', error.message)
        }
    }


    const tableData = jobData.map((job) => ({
        ...job,
        location: `${job.state}, ${job.district}`,
        status: (
            <span className={job.status === 'open' ? 'text-themeColor' : 'text-red-400'}>
                {job.status}
            </span>
        ),
        actions: (
            <div className='flex items-center gap-4'>
                <Select
                    value={job.status}
                    onValueChange={(value) => handleStatusChange(job._id, value as 'open' | 'closed')}
                >
                    <SelectTrigger className="w-24 border-gray-300 focus:ring-0 focus:outline-none ">
                        <SelectValue placeholder={job.status} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='open'>Open</SelectItem>
                        <SelectItem value='closed'>Closed</SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    className='bg-gray-700'
                    onClick={() => navigate(`/employer/jobForm`, { state: { job } })}
                >
                    Edit
                </Button>
            </div>
        )
    }))

    return (
        <>
            {componentLoading ? (
                <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                    <CommonComponentLoader size={25} />
                </div>
            ) : (
                <div className='my-4 max-w-5xl mx-auto'>
                    <div className='flex items-center justify-between'>
                        <h1 className="text-2xl font-semibold font-rubik text-gray-700">Companies Listing</h1>
                        <Button className='bg-white border text-gray-700 border-gray-700 hover:text-white'>
                            <Link to='/employer/jobForm'>Add job</Link>
                        </Button>
                    </div>
                    <div className="mb-10">
                        <Table columns={columns} data={tableData} />
                    </div>

                </div>

            )}
        </>
    )

}

export default JobListCompany

import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'


//Api's
import { fetchJobDetails, changeJobStatusService } from '@/apiServices/companyApi'

//Styles and icons
import { toast } from 'sonner'


//Types and Interfaces
import { RootState } from '@/types/common/commonTypes'
import { JobListingState } from '@/types/company/comapanyInterfaces'
import { JobsRuleType } from '@/types/common/commonInterfaces'

//Components
import Table from '../commonComponents/Table'
import { Button } from '../ui/button'

const JobListCompany: React.FC = () => {
    const [jobData, setJobData] = useState<JobListingState[] | []>([])
    const companyId = useSelector((state: RootState) => state.company?.employerInfo?._id) as string

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetchJobDetails(companyId)
                console.log('Response in job listing component: ', response)
                if(response?.data?.jobs){
                    const formattedJobs = response.data.jobs.map((job: JobsRuleType) => ({
                        id: job._id,
                        title: job.title,
                        location: job.location,
                        workMode: job.workMode,
                        status: job.status
                    }))
                    setJobData(formattedJobs)
                }
            } catch (error: any) {
                console.error('Error in fetching job details in jobs listing component: ', error.message)
            }
        }
        fetchJobs()
    }, [companyId])


    const columns = [
        {key: 'title', label: 'Title'},
        {key: 'location', label: 'Location'},
        {key: 'workMode', label: 'Work Mode'},
        {key: 'status', label: 'Status'},
        {key: 'actions', label: 'Actions'}
    ]

    // const handleViewDetails = (id: string) => {
    //     console.log('Id======>', id)
    // }
    
    const handleStatusChange = async (id:string, newStatus: string) => {
        try {
            const response = await changeJobStatusService(id, newStatus)
            console.log('REsponse in job listing component after changing status: ', response)
            if(response?.data?.status){
                toast.success(response.data.message)
                setJobData((prevJobs) => 
                    prevJobs.map((job) => 
                        job.id === id ? {...job, status: newStatus} : job
                    )
                );
            }
        } catch (error: any) {
            console.error('Error in changing status in job listing component: ', error.message)
        }
    }


    const tableData = jobData.map((job) => ({
        ...job,
        status: (
            <span className={job.status === 'open' ? 'text-themeColor' : 'text-red-400'}>
                {job.status}
            </span>
        ),
        actions: (
            <div className='flex space-x-10'>
                <select 
                    value={job.status}
                    onChange={(e) => handleStatusChange(job.id, e.target.value)}
                    className='border p-2 rounded-md outline-none'
                >
                    <option value='open'>Open</option>
                    <option value='closed'>Closed</option>
                </select>
                {/* <Button
                onClick={() => handleViewDetails(job.id)}
                className='bg-gray-800'
                >
                    Details
                </Button> */}
            </div>
        )
    }))

      return (
        <div className='my-10 max-w-5xl mx-auto'>

            <h1 className="text-2xl font-semibold font-rubik text-gray-700">Companies Listing</h1>
            <div className="mb-10">
                <Table columns={columns} data={tableData}/>
            </div> 
    </div>
      )

}

export default JobListCompany

import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


import { formatDate } from '@/utils/dateFormation'

//Api's
import { getApplicantService } from '@/apiServices/companyApi'

//Types and interfaces
import { RootState } from '@/types/common/commonTypes'
import { JobApplicationsWithJobState } from '@/types/company/comapanyInterfaces'

//Components
import Table from '../commonComponents/Table'
import { Button } from '../ui/button'
import { CommonComponentLoader } from '../commonComponents/spinner'


const ApplicantsListCompany: React.FC = () => {

    const companyId = useSelector((state: RootState) => state.company?.employerInfo?._id!)
    const [allApplicants, setAllApplicants] = useState<JobApplicationsWithJobState[] | []>([])
    const [componentLoading, setComponentLoading] = useState<boolean>(true)
    useEffect(() => {

        const fetchApplicants = async () => {
            try {
                const response = await getApplicantService(companyId)
                console.log('Applicantsssssss: ', response?.data)
                if (response?.data?.applications) {
                    setAllApplicants(response.data.applications)
                    setTimeout(() => {
                        setComponentLoading(false)
                    }, 500)
                }
            } catch (error: any) {
                console.error('Error in ApplicantsListCompany component: ', error.message)
            }
        }

        fetchApplicants()
    }, [companyId])

    const columns = [
        { key: 'name', label: 'Applicant Name' },
        { key: 'title', label: 'Job Title' },
        { key: 'date', label: 'Application Date' },
        { key: 'status', label: 'Application Status' },
        // { key: 'actions', label: '' }

    ]

    const tableData = allApplicants.map((applicant) => ({
        ...applicant,
        name: `${applicant.firstName} ${applicant.lastName}`,
        title: applicant.jobId.title,
        date: formatDate(applicant.createdAt),
        // actions: (
        //     <Button
        //         className='bg-gray-700'
        //     >
        //         Details
        //     </Button>
        // )
    }))
    return (
        <>
            {componentLoading ? (
                <div className="flex items-center justify-center h-[calc(100vh-200px)]">
                    <CommonComponentLoader size={25} />
                </div>
            ) : (
                <div className='my-4 max-w-5xl mx-auto'>
                    <h1 className="text-2xl font-semibold font-rubik text-gray-700">Applications</h1>
                    <div className="mb-10">
                        <Table columns={columns} data={tableData} />
                    </div>
                </div>

            )}
        </>
    )
}

export default ApplicantsListCompany

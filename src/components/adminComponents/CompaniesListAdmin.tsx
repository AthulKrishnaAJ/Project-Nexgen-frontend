import React, {useState, useEffect} from 'react'



//Files
import { getAllCompaniesService, companyVerificationSerivce } from '../../apiServices/adminApi'

//Components
import InputModal from '../commonComponents/InputModal'
import ConfirmPopupWithButton from '../commonComponents/ConfirmPopup'
import ComponentLoaderAdmin from '../commonComponents/admin/ComponentLoaderAdmin'


//Types and interfaces
import { CompanyPrimaryTypeForAdmin, CompanyPrimaryDataForAdminList } from '../../types/admin/adminTypes'

//Styles and icons
import {message, Button} from 'antd'






const CompaniesListAdmin: React.FC = () => {

        const [companyDatas, setCompanaiesData] = useState<CompanyPrimaryTypeForAdmin[]>([])
        const [currentPage, setCurrentPage] = useState<number>(1)
        const [rowsPerPage, setRowsPerPage] = useState<number>(3)
        const [rejectionModalVisible, setRejectionModalVisible] = useState<boolean>(false)
        const [selectedCompanyEmail, setSelectedCompanyEmail] = useState<string | null>(null)
        const [inputModalLoading, setInputModalLoading] = useState<boolean>(false)
        const [componentLoading, setComponentLoading] = useState<boolean>(true)


        const totalPages = Math.ceil(companyDatas.length / rowsPerPage)
        const startIdx = (currentPage - 1) * rowsPerPage
        const endIdx = startIdx + rowsPerPage
        const paginatedData = companyDatas.slice(startIdx, endIdx)


    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await getAllCompaniesService()
                if(response){
                    const {status, companiesData} = response.data
                    if(status){
                        
                        const buildData = companiesData.map((item: CompanyPrimaryTypeForAdmin) => {
                            if(item.verify === 'pending'){
                                return {
                                    ...item,
                                    verify: 'Pending'
                                }
                            }
                            let remainingDays = 0
                            if(item.verify === 'reject' && item.rejection?.expiryDate){
                                let currentDate = new Date()
                                // currentDate.setMonth(currentDate.getMonth() + 6)
                                let endDate = new Date(item.rejection.expiryDate)
                                remainingDays = Math.ceil((endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
                            }
                            return {
                                ...item,
                                verify: item.verify === 'accept' ? 'Verified' : `Rejection ${remainingDays > 0 ? `ends afer ${remainingDays} days` : 'period has been end'}`
                            }
                        })
                        setCompanaiesData(buildData)
                        
                    }

                }
            } catch (error: any) {
                console.error('Error in fetchCompanies at CompanyListAdmin component: ', error.message)
                message.error('An unexpected error occur while finding companies')
            } finally {
                setTimeout(() => {
                    setComponentLoading(false)
                }, 500)
            }
        }
        fetchCompanies()
    }, [])


    const handleAcceptAndReject = async (email: string, action: string, reason?:string) => {
        try {
            const response = await companyVerificationSerivce(email, action, reason)
            closeModal()
            if(response?.data?.status){
                const expiryDate = response?.data?.companyData?.rejection?.expiryDate
                message.success(`Company has been ${action === 'accept' ? 'accepted' : 'rejected'}`)
                setCompanaiesData((prev) => 
                    prev.map((company) => {
                        if(company.email === email){
                            if(action === 'accept'){
                                return {...company, verify: 'Verified'}
                            } else {
                                let currentDate = new Date()
                                let endDate = new Date(expiryDate)
                                let remainingDays = Math.ceil((endDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
                                return {
                                    ...company,
                                    verify: `Rejection ends after ${remainingDays} days`
                                }
                            }
                        }
                        return company
                    })
                );
            }
        } catch (error: any) {
            console.log('Error in handlAcceptAndReject companyListing component: ', error.message)
            message.error('An unexpected error occur')
        } 
    }

    const openModal = (companyEmail: string) => {
        setSelectedCompanyEmail(companyEmail);
        setRejectionModalVisible(true)
    }

    const closeModal = () => {
        setSelectedCompanyEmail(null)
        setRejectionModalVisible(false)
        setInputModalLoading(false)
    }

    const handleModalSubmit = (email: string, action: string, reason?: string) => {
        if(selectedCompanyEmail){
            setInputModalLoading(true)
            handleAcceptAndReject(email, action, reason)
        }
    }

    const handleAccept = (email: string, action: string) => {
        if(email && action){
            handleAcceptAndReject(email, action)
        }
       
    }


    const fields = [
        { key: "companyName", label: "Company Name" },
        { key: "industry", label: "Industry" },
        { key: "email", label: "Email" },
        { key: "verify", label: "Verification" },
        
      ];


  
  return (
    <>
        <h1 className="text-2xl font-semibold font-rubik text-gray-700">Companies Listing</h1>
        
            {componentLoading ? (
                <div className='flex items-center justify-center h-[60vh] w-full'>
                    <ComponentLoaderAdmin/>
                </div>
            ) : (
                <div className='mt-4 max-w-5xl mx-auto font-rubik bg-white rounded-lg overflow-hidden shadow-lg'>
                <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="whitespace-nowrap bg-gray-700">
                    <tr>
                        {fields.map((field) => (
                            <th key={field.key} className="p-4 text-left text-sm font-semibold text-white">
                                {field.label}
                            </th>
                        ))}
                     
                         <th className="p-4 text-left text-sm font-semibold text-white">Actions</th>
            
                    </tr>
                  </thead>
                 
            
                  <tbody className="whitespace-nowrap ">
                    { paginatedData.length > 0 ? (
                            paginatedData.map((company, rowIndex) => {
                            return (
                                <tr key={rowIndex}>
                                    {fields.map((field) => (
                                        <td key={field.key} className='p-4 text-sm font-medium text-gray-700'>
                                        {field.key === 'verify' ? (
                                            <span className={`${
                                                company.verify === 'Verified' 
                                                ? "text-themeColor font-semibold"
                                                : company.verify.includes('Rejection')
                                                ? "text-red-600"
                                                : ""
                                            }`}>
                                                {company.verify}
                                            </span>
                                        ) : (
                                            company[field.key as keyof CompanyPrimaryDataForAdminList]
                                        )}
                                        </td>
                    
                                    ))}
                        
                                    <td className="p-4 text-sm">
                                            <ConfirmPopupWithButton
                                            key={rowIndex}
                                            action='accept'
                                            description='Are you sure to accept this company'
                                            buttonText='Accept'
                                            buttonColor='bg-themeColor'
                                            callback={handleAccept}
                                            data={company.email}
                                            buttonDisabler={company.verify !== 'Pending'}
                                            />
            
                                        <Button
                                            className={`mr-4 px-3 py-1 bg-gray-800 text-white ${company.verify === 'Pending' ? 'secondary-btn' : ''}`}
                                            onClick={() => openModal(company.email)}
                                            disabled={company.verify !== 'Pending'}
                                            >
                                            Reject
                                            </Button>
                                    </td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan={fields.length + 1} className='p-4 text-center text-gray-500'>
                                No entries available here...
                            </td>
                        </tr>
                    )}
                  </tbody>
                </table>
            
                <div className="md:flex m-4 mt-10">
                  <p className="text-sm text-gray-500 flex-1">
                    Showing {startIdx + 1} to {Math.min(endIdx, companyDatas.length)} of {companyDatas.length} entries
                    </p>
                  <div className="flex items-center max-md:mt-4">
                    <p className="text-sm text-gray-500">Display</p>
            
                    <select className="text-sm text-gray-500 border border-gray-400 rounded px-1 py-2 mx-4 outline-none"
                    value={rowsPerPage}
                    onChange={(e) => {
                        setRowsPerPage(Number(e.target.value))
                        setCurrentPage(1)
                    }}
                    >
                        {[5, 10, 20, 50].map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                   
                    </select>
            
                    <div className="flex space-x-1">
                      <button type="button" 
                             className={`px-3 py-2 text-sm rounded-md ${
                             currentPage === 1 ? 'bg-gray-200' : 'hover:bg-bgThemeColor'
                             }`}
                             disabled={currentPage === 1}
                             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                             >
                                 Prev...
                        </button>
            
                     <button type="button" 
                             className={`px-3 py-2 text-sm rounded-md ${
                             currentPage === totalPages ? 'bg-gray-200' : 'hover:bg-bgThemeColor'
                             }`}
                             disabled={currentPage === totalPages}
                             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                             >
                                 Next
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}

         <InputModal
            isVisible={rejectionModalVisible}
            title='Rejection Reason'
            loading={inputModalLoading}
            onClose={closeModal}
            onSubmit={handleModalSubmit}
            data={selectedCompanyEmail}
            action='reject'
         />
    
    </>
  )
}

export default CompaniesListAdmin

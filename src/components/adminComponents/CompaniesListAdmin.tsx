import React, {useState, useEffect} from 'react'



//Files
import { getAllCompaniesService, companyVerificationSerivce } from '../../apiServices/adminApi'

//Components
import InputModal from '../commonComponents/InputModal'


//Types and interfaces
import { CompanyPrimaryTypeForAdmin } from '../../types/admin/adminTypes'

//Styles and icons
import { toast } from 'sonner'






const CompaniesListAdmin: React.FC = () => {

        const [companyDatas, setCompanaiesData] = useState<CompanyPrimaryTypeForAdmin[]>([])
        const [currentPage, setCurrentPage] = useState<number>(1)
        const [rowsPerPage, setRowsPerPage] = useState<number>(5)
        const [rejectionModalVisible, setRejectionModalVisible] = useState<boolean>(false)
        const [selectedCompanyEmail, setSelectedCompanyEmail] = useState<string | null>(null)

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
                            return {
                                ...item,
                                verify: item.verify === 'accept' ? 'Verified' : 'Rejected'
                            }
                        })
                        setCompanaiesData(buildData)
                        
                    }

                }
            } catch (error: any) {
                console.error('Error in fetchCompanies at CompanyListAdmin component: ', error.message)
                toast.error('An unexpected error occur while finding companies')
            }
        }
        fetchCompanies()
    }, [])


    const handleAcceptAndReject = async (email: string, action: string, reason?:string) => {
        try {
            const response = await companyVerificationSerivce(email, action, reason)
            if(response?.data?.status){
                toast.success(`Company ${action === 'accept' ? 'accepted' : 'rejected'} successful`)
                setCompanaiesData((prev) => 
                    prev.map((company) => company.email === email ? {...company, verify: action === 'accept' ? 'Verified' : 'Rejected'} : company)
                )
            }
        } catch (error: any) {
            console.log('Error in handlAcceptAndReject companyListing component: ', error.message)
            toast.error('An unexpected error occur')
        }
    }

    const openModal = (companyEmail: string) => {
        setSelectedCompanyEmail(companyEmail);
        setRejectionModalVisible(true)
    }

    const closeModal = () => {
        setSelectedCompanyEmail(null)
        setRejectionModalVisible(false)
    }

    const handleModalSubmit = (email: string, action: string, reason?: string) => {
        if(selectedCompanyEmail){
            handleAcceptAndReject(email, action, reason)
        }
    }

    const handleAccept = (email: string) => {



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
               {paginatedData.map((company, rowIndex) => {
                 return (
                   <tr key={rowIndex}>
                       {fields.map((field) => (
                           <td key={field.key} className={`p-4 text-sm font-medium `}>
                                   {company[field.key as keyof CompanyPrimaryTypeForAdmin]}
                           </td>
       
                       ))}
             
                        <td className="p-4 text-sm">
                           <button
                                className={`mr-4 px-3 py-1 ${company.verify !== 'Pending' ? 'bg-gray-400 text-black' : 'bg-themeColor text-white hover:bg-hoverThemeColor'} bg- rounded `}
                                onClick={() => handleAccept(company.email)}
                                disabled={company.verify !== 'Pending'}
                                >
                                Accept
                                </button>
                            <button
                                className={`mr-4 px-3 py-1 ${company.verify !== 'Pending' ? 'bg-gray-400 text-black' : 'bg-gray-800 text-white hover:bg-gray-900'} bg- rounded `}
                                onClick={() => openModal(company.email)}
                                disabled={company.verify !== 'Pending'}
                                >
                                Reject
                                </button>
                        </td>
                   </tr>
                 )
               })}
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
                        currentPage === 1 ? 'bg-gray-200' : 'hover:bg-blue-100'
                        }`}
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        >
                            Previous
                   </button>
       
                <button type="button" 
                        className={`px-3 py-2 text-sm rounded-md ${
                        currentPage === totalPages ? 'bg-gray-200' : 'hover:bg-blue-100'
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
         <InputModal
            isVisible={rejectionModalVisible}
            title='Rejection Reason'
            onClose={closeModal}
            onSubmit={handleModalSubmit}
            data={selectedCompanyEmail}
            action='reject'
         />
    
    </>
  )
}

export default CompaniesListAdmin

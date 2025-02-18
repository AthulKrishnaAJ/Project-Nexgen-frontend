import React, {useState} from 'react'

const JobListCompany: React.FC = () => {
    const [jobData, setJobData] = useState([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [rowsPerPage, setRowsPerPage] = useState<number>(3)

    const totalPages = Math.ceil(jobData.length / rowsPerPage)
    const startIdx = (currentPage - 1) * rowsPerPage
    const endIdx = startIdx + rowsPerPage
    const paginatedData = jobData.slice(startIdx, endIdx)

    const fields = [
        { key: "companyName", label: "Company Name" },
        { key: "industry", label: "Industry" },
        { key: "email", label: "Email" },
        { key: "verify", label: "Verification" },
        
      ];
  return (
    
    <div className='mt-4 max-w-5xl mx-auto font-rubik bg-white rounded-lg overflow-hidden shadow-lg'>
    {/* <div className="overflow-x-auto">
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
  </div> */}
</div>
  )
}

export default JobListCompany

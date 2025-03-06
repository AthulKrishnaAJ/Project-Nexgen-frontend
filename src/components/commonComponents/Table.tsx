import {useState} from 'react'

//Types and interfaces
import { TableProp } from '@/types/common/commonTypes'



const Table = <T extends Record<string, any>>({columns, data}: TableProp<T>) => {

        const [currentPage, setCurrentPage] = useState<number>(1)
        const [rowsPerPage, setRowsPerPage] = useState<number>(5)
    
        const totalPages = Math.ceil(data.length / rowsPerPage)
        const startIdx = (currentPage - 1) * rowsPerPage
        const endIdx = startIdx + rowsPerPage
        const paginatedData = data.slice(startIdx, endIdx)

  return (
    <>
    <div className='mt-4 max-w-5xl mx-auto font-rubik bg-white rounded-lg overflow-hidden shadow-lg'>
    <div className="overflow-x-auto">
    <table className="w-full table-auto">
      <thead className="whitespace-nowrap bg-gray-700 text-white">
        <tr>
            {columns.map((column) => (
                <th key={column.key} className="p-4 text-left text-sm font-normal">
                    {column.label}
                </th>
            ))}

        </tr>
      </thead>
     
      <tbody className="whitespace-nowrap">
        {paginatedData.length > 0 ? (
            paginatedData.map((row, index) => (
                <tr key={index} className='hover:bg-gray-100'>
                    {columns.map((column) => (
                        <td key={column.key} className='p-4 text-sm text-gray-700 font-bold'>
                            {row[column.key as keyof typeof row]}
                        </td>
                    ))}
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan={columns.length} className='p-4 text-center text-gray-500'>
                    No entries available here...
                </td>
            </tr>
        )}  
    
      </tbody>
    </table>

    <div className="md:flex m-4 mt-10">
      <p className="text-sm text-gray-500 flex-1">
      Showing {startIdx + 1} to {Math.min(endIdx, data.length)} of {data.length} entries
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
            {[3, 5, 10, 15].map((value) => (
                <option key={value} value={value}>
                    {value}
                </option>
            ))}
       
        </select>

        <div className="flex space-x-1">
          <button type="button" 
                 className={`px-3 py-2 text-sm rounded-md ${
                 currentPage === 1 ? 'bg-gray-200' : 'bg-gray-600 text-white'
                 }`}
                 disabled={currentPage === 1}
                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                 >
                     Prev...
            </button>

         <button type="button" 
                 className={`px-3 py-2 text-sm rounded-md ${
                 currentPage === totalPages ? 'bg-gray-200' : 'bg-gray-600 text-white'
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
</>
  )
}

export default Table

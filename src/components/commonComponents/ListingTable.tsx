import React, { useState } from 'react'

//Components
import ConfirmPopup from './ConfirmPopup';


//Types and interfaces
import { TableProps } from '../../types/common/commonTypes';
import { RowStyle } from '../../types/common/commonTypes';

const ListingTable: React.FC<TableProps> = (
    {
      data,
      fields,
      actions,
      rowsPerPageOptions = [5, 10, 20, 50],
      defaultRowsPerPage = 5,
      rowStyle
    }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage)

    const totalPages = Math.ceil(data.length / rowsPerPage)
    const startIdx = (currentPage - 1) * rowsPerPage
    const endIdx = startIdx + rowsPerPage
    const paginatedData = data.slice(startIdx, endIdx)

    const handleChange = (newPage: number) => {
        setCurrentPage(newPage)
    }

  return (
    <div className='max-w-5xl mx-auto font-rubik bg-white rounded-lg overflow-hidden shadow-lg'>
    <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="whitespace-nowrap bg-gray-700">
        <tr>
            {fields.map((field, index) => (
                <th key={index} className="p-4 text-left text-sm font-semibold text-white">
                    {field.label}
                </th>
            ))}
            {actions.length > 0 && (
                 <th className="p-4 text-left text-sm font-semibold text-white">Actions</th>
            )}

        </tr>
      </thead>
     

      <tbody className="whitespace-nowrap ">
        {paginatedData.map((row, rowIndex) => {
          const style: RowStyle = rowStyle?.(row) || {}
          return (
            <tr key={rowIndex}>
                {fields.map((field) => (
                    <td key={field.key} className={`p-4 text-sm font-medium ${ style.textColor || ''}`}>
                            {row[field.key]}
                    </td>

                ))}
                {actions.length > 0 && (
                    <td className="p-4 text-sm">
                        {actions.map((action, actionIndex) => {
                          const buttonStyle = action.buttonStyle || {};
                          return (
                            action.condition && 
                                action.condition(row) && (
                                   
                                    <ConfirmPopup
                                      key={actionIndex}
                                      action={action.label}
                                      description={`Are you sure to ${action.label.toLocaleLowerCase()} this user`}
                                      buttonColor={buttonStyle.bgColor}
                                      buttonHoverColor={buttonStyle.hoverColor}
                                      callback={action.callback}
                                      data={row}
                                    />

                                    
                                )
                            ) 
                           
                        })}
                    </td>
                )}
            </tr>
          )
        })}
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
            {rowsPerPageOptions.map((value) => (
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
          onClick={() => handleChange(currentPage - 1)}
          >
            Previous
            </button>

         <button type="button" 
          className={`px-3 py-2 text-sm rounded-md ${
            currentPage === totalPages ? 'bg-gray-200' : 'hover:bg-blue-100'
          }`}
          disabled={currentPage === totalPages}
          onClick={() => handleChange(currentPage + 1)}
          >
            Next
            </button>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default ListingTable

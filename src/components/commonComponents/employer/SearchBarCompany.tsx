import React from 'react'


//Styles anb icons
import { IoSearchOutline } from "react-icons/io5";

const SearchBarCompany: React.FC = () => {
  return (
 <div className='flex-1 max-w-xl relative'>
        <IoSearchOutline className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700'/>
            <input 
            type="text" 
            placeholder='Search jobs, applicants...'
            className='w-full py-2 pl-10 text-sm text-gray-700 outline-none border-b-[1px] focus:border-themeColor'
            />
            
        </div>
  )
}

export default SearchBarCompany

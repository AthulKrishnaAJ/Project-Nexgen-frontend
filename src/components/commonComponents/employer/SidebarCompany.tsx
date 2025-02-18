import React from 'react'
import { Link, useLocation } from 'react-router-dom';

//Styles and icons
import { CiViewList } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { GoHome } from "react-icons/go";


const SidebarCompany: React.FC = () => {
    const location = useLocation().pathname

    const sidebarContent = [
        {label: 'Dashboard', path: '/employer', icon: <GoHome size={18}/>},
        {label: 'Posts', path: '/employer/jobs', icon: <CiViewList  size={18}/>},
        {label: 'Applicants', path: '/employer/applicants', icon: <CiUser  size={18}/>},
    
    ]
  return (
    <nav className="bg-white max-h-64 overflow-hidden transition-all w-64 rounded-r-xl shadow-lg mt-4">
    <div className="overflow-auto py-6 h-full">
      <ul className="space-y-1 px-2">

        {sidebarContent.map((item, index) => (
        <li key={index}>
          <Link to={item.path}
            className={`  text-[16px] flex items-center
            ${location === item.path ? 'text-themeColor font-semibold' : 'text-gray-800 hover:text-black'} hover:bg-white rounded px-4 py-3 transition-all space-x-2`}>
            {item.icon}
            <span className='font-rubik'>{item.label}</span>
          </Link>
        </li>
        ))}

      </ul>
    </div>
  </nav>
  )
}

export default SidebarCompany

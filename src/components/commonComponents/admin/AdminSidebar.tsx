import React from 'react'
import { Link, useLocation} from 'react-router-dom';

//Styles and icons
import { MdOutlineDashboard } from "react-icons/md";
import { LiaIndustrySolid } from "react-icons/lia";
import { FiUsers } from "react-icons/fi";

const sidebarContent = [
    {icon: <MdOutlineDashboard/>, label: 'Dashboard', path: '/admin'},
    {icon: <FiUsers/>, label: 'Users', path: '/admin/seekers'},
    {icon: <LiaIndustrySolid/>, label: 'Company', path: '/admin/companies'}
]

const AdminSidebar: React.FC = () => {
  const location = useLocation().pathname
  return (
    <nav className="bg-white max-h-96 overflow-hidden transition-all w-64 rounded-r-xl shadow-lg mt-4">
    <div className="overflow-auto py-6 h-full">
      <ul className="space-y-1 px-2">

        {sidebarContent.map((item, index) => (
        <li key={index}>
          <Link to={item.path}
            className={`  text-[15px] flex items-center
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

export default AdminSidebar

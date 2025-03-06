import React, {useState} from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { clearCompanyState } from '@/redux/slices/companySlice';

//components
import AppTitle from '../AppTitle'
import SearchBarCompany from './SearchBarCompany';
import AlertDialogBox from '../AlertDialogBx';

//Styles and icons
import { FaUserTie } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";


const HeaderCompany: React.FC = () => {
    const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false)
    const location = useLocation().pathname
    const dispatch = useDispatch()
    const navigations = [
        {text: 'Profile', icon: <FaUserTie />},
        {text: 'Notifications', icon: <IoNotificationsOutline/>},
        {text: 'Logout', icon: <IoIosLogOut/>}
    ]
    const handleLogout = () => {
      setLogoutModalOpen(true)
    }

    const confirmLogout = () => {
      dispatch(clearCompanyState())
      setLogoutModalOpen(false)
    }

  return (
    <header className="flex shadow-[rgba(0,0,0,0.1)_-4px_9px_25px_-6px]  py-3 px-4 sm:px-10 bg-white font-rubik min-h-[70px] tracking-wide 
    sticky top-0 z-50">
    <div className="w-full flex items-center justify-between gap-x-14 relative">
      <AppTitle />
        {location !== '/employer/jobForm' ? <SearchBarCompany/> : null}
      <div
        id="collapseMenu"
        className="flex-1 max-lg:hidden lg:flex lg:items-center lg:justify-end max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50"
      >
          <ul className="flex space-x-4">
          {navigations.map((item, index) => (
              <li
                  key={index}
                  id="profile-dropdown-toggle"
                  className="relative px-1 after:absolute after:bg-themeColor after:w-0 hover:after:w-full hover:after:h-[1px] after:block
                      after:-bottom-2 after:left-0 after:transition-all after:duration-300"
                  >
                  
                {
                  item.text === 'Logout' ? (
                  <div className="flex flex-col justify-center items-center cursor-pointer"
                    onClick={handleLogout}
                  >
                    {item.icon}
                    <span className="text-xs mt-1">{item.text}</span>
                  </div> 
                 ) : (
                    <div className="flex flex-col justify-center items-center cursor-pointer">
                      {item.icon}
                      <span className="text-xs mt-1">{item.text}</span>
                   </div> 
                   )
                } 
              </li>
          ))}
            
          </ul>

      </div>
    </div>
    {
      logoutModalOpen && (
          <AlertDialogBox
            title='Confirm Logout'
            description='Are you sure want to exit ?'
            onConfirm={confirmLogout}
            confirmLabel='Exit'
            open={logoutModalOpen}
            openChange={setLogoutModalOpen}
          />
      )
    }
  </header>
  )
}

export default HeaderCompany

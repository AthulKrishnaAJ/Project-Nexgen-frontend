
import React from "react";

//Styles and icon
import { IoIosNotificationsOutline, IoIosLogOut } from "react-icons/io";

//Components
import AppTitle from '../AppTitle';


 const AdminHeader: React.FC = () =>  {
  return (
    <header className='bg-white shadow-md p-4 flex justify-between items-center w-full rounded-b-md'>
    <AppTitle/>
      <div className='flex items-center space-x-8 md:space-x-12 mr-10'>
        <IoIosNotificationsOutline className='text-xl md:text-2xl flex-shrink-0 cursor-pointer'/>
        <div className='flex items-center'>
            <p className='hidden md:flex items-center text-sm md:text-md font-ubuntu font-medium cursor-pointer'
            >
            Logout{" "} <span className='ml-1 text-xl md:text-xl'>{<IoIosLogOut/>}</span>
            </p>
        </div>
      </div>
    </header>
  );
}


export default AdminHeader
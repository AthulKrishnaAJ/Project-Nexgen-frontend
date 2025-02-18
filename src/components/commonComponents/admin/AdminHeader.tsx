
import React, {useState} from "react";
import { useDispatch } from "react-redux";

import { clearAdminState } from "../../../redux/slices/adminSlice";

//Styles and icon
import { IoIosLogOut } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";

//Components
import AppTitle from '../AppTitle';
import AlertDialogBox from "../AlertDialogBx";




 const AdminHeader: React.FC = () =>  {
  const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleLogout = () => {
    setLogoutModalOpen(true)
  }

  const confirmLogout = () => {
    dispatch(clearAdminState())
    setLogoutModalOpen(false)
  };

  return (
    <header className='bg-white shadow-md p-4 flex justify-between items-center w-full rounded-b-md'>
    <AppTitle/>
      <div className='flex items-center space-x-8 md:space-x-12 mr-10'>
        <IoNotificationsOutline className='text-xl md:text-xl flex-shrink-0 cursor-pointer'/>
        <div className='flex items-center'
          onClick={handleLogout}
        >
        <p className='hidden md:flex items-center text-sm md:text-md font-ubuntu font-medium cursor-pointer'
              >
              Logout{" "} <span className='ml-1 text-xl md:text-xl'>{<IoIosLogOut/>}</span>
              </p>
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
  );
}


export default AdminHeader
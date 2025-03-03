import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { clearSeekerState } from '@/redux/slices/seekerSlice';

//componets
import AppTitle from '../AppTitle'
import DropDownMenu from '../DropDownMenu';
import AlertDialogBox from '../AlertDialogBx';

//Styles and icons
import { CiUser } from "react-icons/ci";
import { BsBuildings } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";


//Types and interfaces
import { RootState } from '@/types/common/commonTypes';


const HeaderSeeker: React.FC = () => {

  const seekerInfo = useSelector((state: RootState) => state.seeker.seekerInfo)
  const dispatch = useDispatch()
  const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false)
  

    const mainNavigations = [
        {text: 'Jobs', link: '#'},
        {text: 'Companies', link: '#'}
    ]

    const navigations = [
        {text: 'Are you an employer', icon: <BsBuildings/>, link: '/employer'},
        {
          text: seekerInfo ? 'Account' : 'Login',
          icon: seekerInfo ? <CiUser/> : <CiLogin/>,
          link: !seekerInfo ? '/login' : ''
        },
      
    ]


    const handleLogout = () => {
       setLogoutModalOpen(true)
      
    }

    const confirmLogut = () => {
        dispatch(clearSeekerState())
        setLogoutModalOpen(false)
    }
  
    const menuNavigations = [
        {label: 'Profile', link: '/profile'},
        {label: 'Subscription', link: '/subcription'}
    ]

    const menuExicutors = [
      {label: 'Log out', icon: <IoIosLogOut/>, exicutor: handleLogout}
    ]
    

  return (

    <header className="flex shadow-[rgba(0,0,0,0.1)_-4px_9px_25px_-6px] py-3 px-4 sm:px-10 bg-white font-rubik min-h-[70px] tracking-wide sticky top-0 z-50">
      <div className="w-full flex items-center justify-between gap-x-14 relative">
        <AppTitle />
        <div
          id="collapseMenu"
          className="flex-1 max-lg:hidden lg:flex lg:items-center lg:justify-between max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50"
        >

          <ul className="lg:flex lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:px-8 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            {mainNavigations.map((item, index) => (
                    <li key={index} className="mt-4 max-lg:border-b max-lg:py-3 relative lg:hover:after:absolute lg:after:bg-themeColor lg:after:w-0
                        lg:hover:after:w-full lg:hover:after:h-[1px] lg:after:block lg:after:-bottom-2 lg:after:transition-all lg:after:duration-300">
                        <a href="#" className="text-[#333] block text-sm">
                            {item.text}
                        </a> 
                    </li>
                ))}
          </ul>

          <div className="flex items-center space-x-4">
            <ul className="flex space-x-4">
            {navigations.map((item, index) => (
                <li
                    key={index}
                    id="profile-dropdown-toggle"
                    className="relative px-1 after:absolute after:bg-themeColor after:w-0 hover:after:w-full hover:after:h-[1px] after:block
                        after:-bottom-2 after:left-0 after:transition-all after:duration-300"
                    >
                      {item.text === 'Account'? (
                      <DropDownMenu
                          menuLabel='My Account'
                          menuNavigations={menuNavigations}
                          menuExicutors={menuExicutors}
                          triggerElement={
                            <div className="flex flex-col justify-center items-center cursor-pointer">
                            {item.icon}
                            <span className="text-xs mt-1">{item.text}</span>
                        </div>
                      }
                      /> ) : ( 
                      <Link to={item.link}>
                      <div className="flex flex-col justify-center items-center cursor-pointer">
                        {item.icon}
                        <span className="text-xs mt-1">{item.text}</span>
                      </div>
                      </Link>
                      )}
                </li>
            ))}
              
            </ul>
        
            
          </div>
         
        </div>
      </div>
      {logoutModalOpen && (
            <AlertDialogBox
              title='Confirm Logout'
              description='Are you sure want to exit'
              onConfirm={confirmLogut}
              confirmLabel='Exit'
              open={logoutModalOpen}
              openChange={setLogoutModalOpen}
            />
          )}
    </header>
  )
}

export default HeaderSeeker

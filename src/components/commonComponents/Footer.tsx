import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

//Components
import AppTitle from './AppTitle'

//Types and interfaces
import { FooterProps } from '../../types/common/commonTypes'

const Footer: React.FC<FooterProps> = ({socialLinks, useFullLinks, information}) => {
    
    const location = useLocation()
    const splitedName = location.pathname.split('/')[1]

    
  return (
    <footer className={`${splitedName === 'employer' ? 'bg-gray-100' : 'bg-bgThemeColor'} pt-10 pb-4 px-10 tracking-wide border-t `}>
    <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="lg:flex lg:items-center">
          
            <AppTitle />
           
        </div>

        <div className="lg:flex lg:items-center">
            <ul className="flex space-x-6">
                {socialLinks.map((item, index) => (
                    <li key={index} >
                        <Link to={item.link} className='text-2xl text-gray-700 bg-white'>
                            {item.icon}
                        </Link>
                    </li>

                ))}
            </ul>
        </div>
        <div className='font-rubik'>
            <h4 className="text-lg mb-6 text-gray-800 font-medium">Useful links</h4>
            <ul className="space-y-4 pl-2">
                {useFullLinks.map((item, index) => (
                    <li key={index}>
                        <Link to={item.link} className="text-sm text-gray-700 hover:text-themeColor">
                            {item.text}
                        </Link>
                    </li>
                ))}
          
            </ul>
        </div>

        <div className='font-rubik'>
            <h4 className="text-lg mb-6 text-gray-800 font-medium">Information</h4>
            <ul className="space-y-4 pl-2">
            {information.map((item, index) => (
                <li key={index}>
                    <Link to={item.link} className="text-sm text-gray-700 hover:text-themeColor">
                        {item.text}
                        </Link>
                </li>
            ))}
            </ul>
        </div>
        </div>
        <p className='text-gray-800 text-sm mx-12'>© Nexgen. All rights reserved.</p>
     
    </div>
    </footer>
  )
}

export default Footer

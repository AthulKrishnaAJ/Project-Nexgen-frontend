import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

//Components
import HeaderCompany from '../../components/commonComponents/employer/HeaderCompany'
import Footer from '../../components/commonComponents/Footer'
import SidebarCompany from '../../components/commonComponents/employer/SidebarCompany'

//Styles and icons
import { FaFacebookSquare, FaTwitterSquare, FaLinkedin } from 'react-icons/fa'

const CompanyLayout: React.FC = () => {

    const location = useLocation()
    const socialLinks = [
        {icon: <FaFacebookSquare/>, link: '#'},
        {icon: <FaTwitterSquare/>, link: '#'},
        {icon: <FaLinkedin/>, link: '#'}
    ]

    const useFullLinks = [
        {text: 'Posts', link: '#'},
        {text: 'Applicants', link: '#'},
        {text: 'Blog', link: '#'},
    ]

    const information = [
        {text: 'About Us', link: '#'},
        {text: 'Privacy Policy', link: '#'},
    ]


return (
<div className='flex flex-col min-h-screen bg-gray-100'>
    <HeaderCompany/>
    <div className='flex flex-1 my-2'>
      {location.pathname !== '/employer/jobPost' && <SidebarCompany/>}
        <main className='flex-1 font-rubik'>
            <Outlet/>
        </main>
    </div>
        <Footer 
            socialLinks={socialLinks} 
            useFullLinks={useFullLinks} 
            information={information}
            />

</div>
)
}

export default CompanyLayout

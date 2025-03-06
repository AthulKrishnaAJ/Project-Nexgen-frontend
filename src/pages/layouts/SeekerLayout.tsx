import React from 'react'
import { Outlet } from 'react-router-dom';

//Components
import HeaderSeeker from '@/components/commonComponents/seeker/HeaderSeeker'
import Footer from '@/components/commonComponents/Footer'



//Styles and icons
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

const SeekerLayout: React.FC = () => {

    const socialLinks = [
              {icon: <FaFacebookSquare/>, link: '#'},
              {icon: <FaTwitterSquare/>, link: '#'},
              {icon: <FaLinkedin/>, link: '#'}
          ]
      
          const useFullLinks = [
              {text: 'Jobs', link: '#'},
              {text: 'Companies', link: '#'},
              {text: 'Blog', link: '#'},
          ]
      
          const information = [
              {text: 'About Us', link: '#'},
              {text: 'Privacy Policy', link: '#'},
          ]

  return (
    <div className='flex flex-col min-h-screen bg-bgThemeColor'>
      <HeaderSeeker/>
      <main className='flex-1 font-rubik'>
        <Outlet/>
      </main>
      <Footer 
        socialLinks={socialLinks} 
        useFullLinks={useFullLinks} 
        information={information}
        />

    </div>

  )
}

export default SeekerLayout

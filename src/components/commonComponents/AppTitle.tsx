import React from 'react'
import { Link } from 'react-router-dom'
import nexgenIcon from '../../assets/Nexgen-icon.png'

const AppTitle: React.FC= () => {
  return (
    <Link to='/'>
      <div className='flex items-center mx-8'>
 
        <img className='h-12 md:h-14 w-auto' src={nexgenIcon} alt="Nexgen Title" />
        <div className=''>
            <h1 className='text-4xl font-marcellus text-themeColor'>Nexgen</h1>
        </div>
      </div>
    </Link>
  )
}

export default AppTitle

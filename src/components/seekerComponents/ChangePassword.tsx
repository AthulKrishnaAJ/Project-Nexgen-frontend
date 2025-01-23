import React, {useState} from 'react'

//Styles and icons
import { LuEye, LuEyeClosed } from 'react-icons/lu'

//Types
import { passwordTogglingState } from '../../types/seeker/seekerTypes'

const ChangePassword: React.FC = () => {

    const [passwordField, setPasswordField] = useState<passwordTogglingState>({
        password: {type: 'password', icon: <LuEyeClosed/>},
        confirmPassowrd: {type: 'password', icon: <LuEye/>}
    })

    const handleToggleState = (state) => {
        setPasswordField((prev) => ({
    
        }))
    }

  return (
        <div className='font-rubik bg-bgThemeColor min-h-screen flex items-center justify-center p-4'>
            <div className='bg-white w-full max-w-md p-12 rounded-lg shadow-lg'>
                <form className='space-y-8' >
                <div className='text-center'>
                    <h2 className='text-2xl font-semibold
                    bg-gradient-to-br from-gray-800 to-gray-600 bg-clip-text text-transparent'>Change your Password</h2>
                </div>

                <div>
                    <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-1'>
                    New Password
                    </label>
                    <div className='relative'>
                    <input 
                        name="password"
                        type={passwordField.password.type}
                        className={`w-full bg-transparent text-xs text-black border-b border-gray-300 focus:border-themeColor
                         py-2 pl-2 pr-10 outline-none transition-colors duration-300`}
                        placeholder="Enter your password"
     
                    />
 
                    <p className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer'
                    onClick={() => handleToggleState('password')}
                    > 
                    {passwordField.password.type === 'password' ? <LuEyeClosed/> : <LuEye/>}
                    </p>
                    </div>
                    
                </div>
                <div>
                    <label htmlFor="confirmPassword" className='block text-sm font-medium text-gray-700 mb-1'>
                    Confirm Password
                    </label>
                    <div className='relative'>
                    <input 
                        name="confirmPassword" 
                        type={passwordField.confirmPassowrd.type}
                        className={`w-full bg-transparent text-xs text-black border-b border-gray-300 focus:border-themeColor
                         py-2 pl-2 pr-10 outline-none transition-colors duration-300`}
                        placeholder="Re-enter your password"
     
                    />
                    <p className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer'> 
                    {passwordField.confirmPassowrd.type === 'password' ? <LuEyeClosed/> : <LuEye/>}
                    </p>
                    </div>
                    
                </div>
                <div>
                    <button type="submit" className="w-full shadow-xl py-3 px-4 text-sm text-white font-semibold rounded-md bg-[#24A484] hover:bg-[#298872] focus:outline-none transition-colors">
                                    Change
                        </button>
                </div>

                </form>

            </div>
            
            </div>
  )
}

export default ChangePassword

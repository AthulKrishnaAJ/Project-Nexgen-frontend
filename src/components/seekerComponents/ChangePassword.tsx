import React, {useState} from 'react'
import { useFormik } from 'formik'
import { useLocation, useNavigate } from 'react-router-dom'


//Files
import { changePasswordService } from '../../apiServices/seekerApi'
import prepareDataForPostApi from '../../utils/prepateDataForPostApis'

//Styles and icons
import { LuEye, LuEyeClosed } from 'react-icons/lu'
import { toast } from 'sonner'

//Types
import { passwordTogglingState } from '../../types/common/commonTypes'
import { changePasswordValidationSchema } from '../../validations/commonValidations'

//Component
import SubmitButtonSeeker from '../commonComponents/seeker/SubmitButtonSeeker'



const ChangePassword: React.FC = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const location = useLocation()
    const email = location.state?.email

    const [passwordField, setPasswordField] = useState<passwordTogglingState>({
        password: {type: 'password', icon: <LuEyeClosed/>},
        confirmPassword: {type: 'password', icon: <LuEye/>}
    })

    const handleToggleState = (field: string) => {
        setPasswordField((prev: passwordTogglingState) => ({
            ...prev,
            [field]: {
                type: prev[field].type === 'password' ? 'text' : 'password',
                icon: prev[field].type === 'password' ? <LuEye/> : <LuEyeClosed/>
            }
        }))
    }

    

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
            email: email
        },
        validationSchema: changePasswordValidationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            const trimData = prepareDataForPostApi(values, ['confirmPassword']) 

            try {
                const response = await changePasswordService(trimData)
                if(response){
                    if(response.data?.status){
                        toast.success(response.data.message)
                        setTimeout(() => {
                            navigate('/login', {replace: true})
                        }, 500)
                    }
                }
            } catch (error:any) {
                console.error('Error in Change password component: ', error.message)
                toast.error('An unexpected error occur')
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            }
        }
    })

  return (
        <div className='font-rubik bg-bgThemeColor min-h-screen flex items-center justify-center p-4'>
            <div className='bg-white w-full max-w-md p-12 rounded-lg shadow-lg'>
                <form className='space-y-8' onSubmit={formik.handleSubmit}>
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
                        className={`w-full bg-transparent text-xs text-black border-b 
                        ${formik.touched.password && formik.errors.password ? 'border-red-400' : 'border-gray-300 focus:border-themeColor'} py-2 pl-2 pr-10 outline-none transition-colors duration-300`}
                        placeholder="Enter your password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
     
                    />
 
                    <p className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer'
                    onClick={() => handleToggleState('password')}
                    > 
                    {passwordField.password.icon}
                    </p>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <span className='text-xs text-red-500'>{formik.errors.password}</span>
                    )}
                </div>
                <div>
                    <label htmlFor="confirmPassword" className='block text-sm font-medium text-gray-700 mb-1'>
                    Confirm Password
                    </label>
                    <div className='relative'>
                    <input 
                        name="confirmPassword" 
                        type={passwordField.confirmPassword.type}
                        className={`w-full bg-transparent text-xs text-black border-b 
                         ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-400' : 'border-gray-300 focus:border-themeColor'} py-2 pl-2 pr-10 outline-none transition-colors duration-300`}
                        placeholder="Re-enter your password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
     
                    />
                    <p className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer'
                    onClick={() => handleToggleState('confirmPassword')}
                    > 
                    {passwordField.confirmPassword.icon}
                    </p>
                    </div>
                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <span className='text-xs text-red-500'>{formik.errors.confirmPassword}</span>
                    )}
                </div>
                <div>
                    <SubmitButtonSeeker loading={loading} text='Change'/>
                </div>
                </form>

            </div>
            
            </div>
  )
}

export default ChangePassword

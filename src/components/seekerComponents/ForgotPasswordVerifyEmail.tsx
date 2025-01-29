import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

//Files
import { forgotPassEmailVerify } from '../../apiServices/seekerApi'
import { verifyEmailValidationSchema } from '../../validations/commonValidations'
import prepareDataForPostApi from '../../utils/prepateDataForPostApis'

//Styles and icons
import { CiMail } from 'react-icons/ci'
import { toast } from 'sonner'

//Component
import SubmitButtonSeeker from '../commonComponents/seeker/SubmitButtonSeeker'


const ForgotPasswordVerifyEmail: React.FC = () => {

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues:{
            email: ''
        },
        validationSchema: verifyEmailValidationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            const trimData = prepareDataForPostApi(values, [])
            try {
                const response = await forgotPassEmailVerify(trimData.email)

                console.log('Response after verify email in verify email component: ', response)
                if(response){
                    const {status, message} = response.data
                    if(status){
                        toast.success(message)
                        const otpExpirationTime = Math.floor(Date.now() / 1000) + 60
                        localStorage.setItem('userEmail', trimData.email)
                        localStorage.setItem('seekerOtpExpiration', otpExpirationTime.toString())
                        navigate('/otp', {state: {
                            value: 'emailVerificationPage'
                        }})
                    }
                }   
            } catch (error: any) {
                console.log('Error after verifying email at verify email component: ', error)
                toast.error('An unexpected error occured')
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
                <form className='space-y-8'  onSubmit={formik.handleSubmit}>
                <div className='text-center'>
                    <h2 className='text-2xl font-semibold
                    bg-gradient-to-br from-gray-800 to-gray-600 bg-clip-text text-transparent'>Verify your Email</h2>
                </div>

                <div>
                    <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-1'>
                    Email
                    </label>
                    <div className='relative'>
                    <input 
                        id="email"
                        name="email" 
                        className={`w-full bg-transparent text-xs text-black border-b
                         ${formik.touched.email && formik.errors.email ? 'border-red-400' : 'border-gray-300 focus:border-themeColor'} py-2 pl-2 pr-10 outline-none transition-colors duration-300`}
                        placeholder="Enter your email"
                        value={formik.values.email}
                        onChange={formik.handleChange} 
                        onBlur={formik.handleBlur}
                    />
                    <CiMail className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400'/>
                    </div>
                    {
                        formik.touched.email && formik.errors.email && (
                            <p className='text-xs text-red-500'>{formik.errors.email}</p>
                        )
                    }
                </div>
                <div>
                    <SubmitButtonSeeker loading={loading} text='Verify'/>
                </div>

                </form>

            </div>
            
            </div>
  )
}

export default ForgotPasswordVerifyEmail

import React,{useState} from 'react'
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';

//Styles and Icons
import { LuEye, LuEyeOff } from "react-icons/lu";
import { CiMobile3, CiMail, CiUser } from "react-icons/ci";
import signupEmployerImg from '../../assets/signupEmployerImg.png'
import {toast} from 'sonner'

//Files
import { signupEmployer } from '../../apiServices/companyApi';
import {signupValidationSchema} from '../../validations/commonValidation';


//types
import { EmployerPrimaryDetailsState } from '../../types/company/companyTypes';

//Component
import SubmitButton from "../commonComponents/employer/SubmitButtonEmployer";



const SignupEmployer: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()


    const formik = useFormik ({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: signupValidationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            console.log('details in employers sigup form: ', values)

            const employerData = Object.fromEntries(
                    Object.entries(values).map(([key, value]) => [key, value.trim()])
                    .filter(([key]) => key !== 'confirmPassword')
                  ) as EmployerPrimaryDetailsState

            try {
                const response = await signupEmployer(employerData)
                console.log('Response after employer signup: ', response)
                if(response){
                  const data = response?.data
                  if(data.success){
                    toast.success(data.message)
                    const otpExpirationTime = Math.floor(Date.now() / 1000) + 60
                    localStorage.setItem('employerEmail', employerData.email)
                    localStorage.setItem('employerOtpExpiration', otpExpirationTime.toString())
                    navigate('/employer/otp', {replace: true})
                  }
                }
            } catch (error: any) {
                console.error('Error in employer signup submission at signup employer component: ', error)
                toast.error('An unexpected error occured')
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            }
        }
    })

    return (
        <div className="font-rubik bg-white min-h-screen">
        <div className="grid md:grid-cols-2 items-center h-full">
        <div className="max-md:order-1 p-8 bg-bgThemeColor h-full flex flex-col items-center justify-center text-white">
          <h2 className="text-4xl font-bold mb-6 text-center text-themeColor">Find Your Perfect Match</h2>
          <ul className="space-y-4 text-lg">
            <li className="flex items-center text-themeColor">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Connect with top talent
            </li>
            <li className="flex items-center text-themeColor">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Streamline your hiring process
            </li>
            <li className="flex items-center text-themeColor">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Build your dream team
            </li>
          </ul>
          <div className="w-full flex justify-center">
            <img 
              src={signupEmployerImg} 
              alt="signup image" 
              className="max-w-full w-auto max-h-[40vh] object-contain"
            />
          </div>
        </div>
    
            <div className="flex items-center h-full px-20 py-10">
              <form className="max-w-lg w-full mx-auto space-y-4" onSubmit={formik.handleSubmit}>
                <div className="mb-6">
                  <h3 className="bg-gradient-to-br from-gray-800 to-gray-500 bg-clip-text text-transparent text-2xl font-bold text-center md:text-left">Create an account</h3>
                </div>
    
                <div>
                  <label htmlFor="firstName" className="text-gray-800 text-xs font-semibold block">First Name</label>
                  <div className="relative flex items-center">
                    <input 
                      type="text"
                      id="firstName"
                      name="firstName" 
                      className={`w-full bg-transparent text-xs border-b px-2 py-2 pr-8 outline-none
                        ${formik.touched.firstName && formik.errors.firstName ? 'border-red-400' : 'border-gray-300 focus:border-themeColor'}`} 
                      placeholder="Enter first name" 
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <CiUser className="absolute right-2 text-gray-400" />
                  </div>
                  {
                  formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-red-500 text-xs">
                      {formik.errors.firstName}
                    </p>
                  )}
                </div>
    
                <div>
                  <label htmlFor="lastName" className="text-gray-800 text-xs font-semibold block">Last Name</label>
                  <div className="relative flex items-center">
                    <input 
                      type="text"
                      id="lastName"
                      name="lastName" 
                      className={`w-full bg-transparent text-xs border-b px-2 py-2 pr-8 outline-none
                        ${formik.touched.lastName && formik.errors.lastName ? 'border-red-400' : 'border-gray-300 focus:border-themeColor'}`} 
                      placeholder="Enter last name" 
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <CiUser className="absolute right-2 text-gray-400" />
                  </div>
                  {
                  formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-red-500 text-xs">
                      {formik.errors.lastName}
                    </p>
                  )
                }
                </div>
    
                <div>
                  <label htmlFor="email" className="text-gray-800 text-xs font-semibold block">Email</label>
                  <div className="relative flex items-center">
                    <input 
                      type="email"
                      id="email"
                      name="email" 
                      className={`w-full bg-transparent text-xs border-b px-2 py-2 pr-8 outline-none
                        ${formik.touched.email && formik.errors.email ? 'border-red-400' : 'border-gray-300 focus:border-themeColor'}`} 
                      placeholder="Enter email" 
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <CiMail className="absolute right-2 text-gray-400" />
                  </div>
                  {
                    formik.touched.email && formik.errors.email && (
                        <p className='text-xs text-red-500'>
                            {formik.errors.email}
                        </p>
                    )
                  }
                </div>
    
                <div>
                  <label htmlFor="mobile" className="text-gray-800 text-xs font-semibold block">Mobile Number</label>
                  <div className="relative flex items-center">
                    <input 
                      type="tel"
                      id="mobile"
                      name="mobile" 
                      className={`w-full bg-transparent text-xs border-b px-2 py-2 pr-8 outline-none
                        ${formik.touched.mobile && formik.errors.mobile ? 'border-red-400' : 'border-gray-300 focus:border-themeColor'}`} 
                      placeholder="Enter mobile number" 
                      value={formik.values.mobile}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <CiMobile3 className="absolute right-2 text-gray-400" />
                  </div>
                  {
                    formik.touched.mobile && formik.errors.mobile && (
                        <p className='text-xs text-red-500'>
                            {formik.errors.mobile}
                        </p>
                    )
                  }
                </div>
    
                <div>
                  <label htmlFor="password" className="text-gray-800 text-xs font-semibold block">Password</label>
                  <div className="relative flex items-center">
                    <input 
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password" 
                      className={`w-full bg-transparent text-xs border-b px-2 py-2 pr-8 outline-none
                        ${formik.touched.password && formik.errors.password ? 'border-red-400' : 'border-gray-300 focus:border-themeColor'}`}  
                      placeholder="Enter password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur} 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)} 
                      className="absolute right-2 text-gray-400 focus:outline-none"
                    >
                      {showPassword ? <LuEye /> : <LuEyeOff />}
                    </button>
                  </div>
                  {
                    formik.touched.password && formik.errors.password && (
                        <p className='text-xs text-red-500'>
                            {formik.errors.password}
                        </p>
                    )
                  }
                </div>
    
                <div>
                  <label htmlFor="confirmPassword" className="text-gray-800 text-xs font-semibold block">Confirm Password</label>
                  <div className="relative flex items-center">
                    <input 
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword" 
                      className={`w-full bg-transparent text-xs border-b px-2 py-2 pr-8 outline-none
                        ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-400' : 'border-gray-300 focus:border-themeColor'}`} 
                      placeholder="Confirm password" 
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur} 
                    />
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                      className="absolute right-2 text-gray-400 focus:outline-none"
                    >
                      {showConfirmPassword ? <LuEye/> : <LuEyeOff/>}
                    </button>
                  </div>
                  {
                    formik.touched.confirmPassword && formik.errors.confirmPassword && (
                        <p className='text-xs text-red-500'>
                            {formik.errors.confirmPassword}
                        </p>
                    )
                  }
                </div>
    
                <div className="mt-1">
                  <SubmitButton loading={loading} text='Create account'/>
                  <p className="text-sm mt-3 text-center text-gray-800">
                    Already have an account? 
                    <Link to="/employer/login" className="text-themeColor font-semibold hover:underline ml-1">Login here</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
  
}

export default SignupEmployer

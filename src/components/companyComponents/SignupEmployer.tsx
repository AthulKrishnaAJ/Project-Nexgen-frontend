import React,{useState} from 'react'
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';


//Styles and Icons
import { LuEye, LuEyeOff } from "react-icons/lu";
import { CiMobile3, CiMail } from "react-icons/ci";
import { LiaIndustrySolid } from "react-icons/lia";
import signupEmployerImg from '../../assets/signupEmployerImg.png'
import {toast} from 'sonner'

//Files
import { signupEmployer } from '../../apiServices/companyApi';
import prepareDataForPostApi from '../../utils/prepateDataForPostApis';

//Validations
import { companyValidationSchema } from '../../validations/companyValidations';

//Component
import SubmitButton from "../commonComponents/employer/SubmitButtonEmployer";



const SignupEmployer: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()


    const formik = useFormik ({
        initialValues: {
           companyName: '',
           industry: '',
            email: '',
            mobile: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: companyValidationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            console.log('details in employers sigup form: ', values)

            const employerData = prepareDataForPostApi(values, ['confirmPassword'])

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
                  <h3 className="bg-gradient-to-br from-gray-800 to-gray-500 bg-clip-text text-transparent text-2xl font-bold text-center md:text-left">Create an account for your company</h3>
                </div>
    
                <div>
                  <label htmlFor="companyName" className="text-gray-800 text-xs font-semibold block">Company Name</label>
                  <div className="relative flex items-center">
                    <input 
                      type="text"
                      id="companyName"
                      name="companyName" 
                      className={`w-full bg-transparent text-xs border-b px-2 py-2 pr-8 outline-none
                        ${formik.touched.companyName && formik.errors.companyName ? 'border-red-400' : 'border-gray-300 focus:border-themeColor'}`} 
                      placeholder="Enter company name" 
                      value={formik.values.companyName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <LiaIndustrySolid className="absolute right-2 text-gray-400" />
                  </div>
                  {
                  formik.touched.companyName && formik.errors.companyName && (
                    <p className="text-red-500 text-xs">
                      {formik.errors.companyName}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="industry" className="text-gray-800 text-xs font-semibold block">Company Industry</label>
                  <div className="relative flex items-center">
                    <input 
                      type="text"
                      id="industry"
                      name="industry" 
                      className={`w-full bg-transparent text-xs border-b px-2 py-2 pr-8 outline-none
                        ${formik.touched.industry && formik.errors.industry ? 'border-red-400' : 'border-gray-300 focus:border-themeColor'}`} 
                      placeholder="Enter your industry" 
                      value={formik.values.industry}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <LiaIndustrySolid className="absolute right-2 text-gray-400" />
                  </div>
                  {
                  formik.touched.industry && formik.errors.industry && (
                    <p className="text-red-500 text-xs">
                      {formik.errors.industry}
                    </p>
                  )}
                </div>
    

    
                <div>
                  <label htmlFor="email" className="text-gray-800 text-xs font-semibold block">Company Email</label>
                  <div className="relative flex items-center">
                    <input 
                      type="email"
                      id="email"
                      name="email" 
                      className={`w-full bg-transparent text-xs border-b px-2 py-2 pr-8 outline-none
                        ${formik.touched.email && formik.errors.email ? 'border-red-400' : 'border-gray-300 focus:border-themeColor'}`} 
                      placeholder="Enter company's email" 
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

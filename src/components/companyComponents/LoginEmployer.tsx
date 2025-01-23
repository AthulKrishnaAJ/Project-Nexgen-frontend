import React, {useState} from 'react'
import { useFormik } from 'formik';
import* as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

//Files
import { employerLoginAction } from '../../redux/actions/companyActions';

//Styles and icons
import { LuEye, LuEyeOff } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { Loader } from '../commonComponents/spinner';
import { toast } from 'sonner';

//Types
import { LoginState } from '../../types/common/commonTypes';
import { AppDispatch } from '../../types/common/commonTypes';


const employerLoginValidationSchema = Yup.object().shape({
  email: Yup.string()
  .transform((value) => value.trim())
  .email('Enter valid email')
  .required('Email is required'),
  password: Yup.string()
  .transform((value) => value.trim())
  .required('password is required')
})

const LoginEmployer: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch<AppDispatch>()


  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: employerLoginValidationSchema,
    onSubmit: async (values: LoginState) => {
      setLoading(true)
      const trimData = Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, value.trim()])
      ) as LoginState

      try {
        const response = await dispatch(employerLoginAction(trimData) as any)
        console.log('Response after in login component: ', response)
        if(response){
          if(response.payload.success){
            toast.success(response.payload.message)
          } else {
            toast.error(response.payload.message)
          }
        }
      } catch (error: any) {
        console.log('Error in after login in employer login component: ', error)
        toast.error('An unexpected error occured!')
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      }
    }
  })

  return (
    <div className='font-rubik bg-bgThemeColor min-h-screen flex items-center justify-center p-4'>
      <div className='bg-white w-full max-w-md p-10 rounded-lg shadow-lg'>
        <form className='space-y-6' onSubmit={formik.handleSubmit}>
          <div className='text-center'>
            <h2 className='text-2xl font-semibold
             bg-gradient-to-br from-gray-800 to-gray-600 bg-clip-text text-transparent'>Login</h2>
          </div>

          <div>
            <label htmlFor="email" className='block text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <div className='relative'>
            <input 
                id="email"
                name="email" 
                className="w-full bg-transparent text-xs text-black border-b border-gray-300 focus:border-themeColor py-2 pl-2 pr-10 outline-none transition-colors duration-300"
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
            <label htmlFor="password" className='block text-sm font-medium text-gray-700 mb-1'>
              Password
            </label>
            <div className='relative'>
              <input 
                id='password'
                name='password'
                type={showPassword ? 'text' : 'password'}
                className='w-full bg-transparent text-xs text-black border-b border-gray-300 focus:border-themeColor py-2 pl-2 pr-10 outline-none transition-colors duration-300'
                placeholder="Enter your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
               />
               <button
               type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400'
               >
                {showPassword ? <LuEye/> : <LuEyeOff/>}
               </button>
            </div>
            {
              formik.touched.password && formik.errors.password && (
                <p className='text-xs text-red-500'>{formik.errors.password}</p>
              )
            }
          </div>

          <div>
            
          <div className='mb-4'>
            <p className='text-gray-600 cursor-pointer text-sm font-semibold'>Forgot password ?</p>
          </div>
            <button 
                  type="submit" 
                  className="w-full py-2.5 px-4 text-sm tracking-wider rounded-md text-white focus:outline-none relative overflow-hidden group"
                  >
                          <span className="relative z-10">{loading ? <Loader size={60}/> : 'Login'}</span>
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-500 group-hover:opacity-0 transition-opacity duration-300"></div>
                          <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
          </div>
          <p className="text-sm text-gray-600 text-center">Don't have an account? 
                <Link to='/employer/signup' className="text-[#24A484] font-semibold hover:underline ml-1">
                    Signup here
                </Link>
            </p>


        </form>

      </div>
      
    </div>
  )
}

export default LoginEmployer

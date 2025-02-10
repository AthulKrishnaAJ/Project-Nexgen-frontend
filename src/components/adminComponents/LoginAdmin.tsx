import React, {useState} from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


//Files
import prepareDataForPostApi from '../../utils/prepateDataForPostApis'
import { adminLoginAction } from '../../redux/actions/adminActions'

//Styles and icons
import { CiMail } from 'react-icons/ci'
import { LuEyeOff, LuEye } from 'react-icons/lu'

//Validations
import { loginValidationSchema } from '../../validations/commonValidations'

//Components
import SubmittButtonAdmin from '../commonComponents/admin/SubmittButtonAdmin'

//Types
import { AppDispatch } from '../../types/common/commonTypes'
import { toast } from 'sonner'



const LoginAdmin: React.FC = () => {

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            const trimData = prepareDataForPostApi(values, [])
            try {
                const response = await dispatch(adminLoginAction(trimData) as any)
                console.log('Response in admin login component: ', response)
                if(response){
                    if(response.payload.success){
                        toast.success(response.payload.message)
                        navigate('/admin/dashboard', {replace: true})
                    } else {
                        toast.error(response.payload.message)
                    }
                }
        
            } catch (error: any) {
                console.error('Error in Admin login component: ', error)
            } finally {
                setTimeout(() => {
                    setLoading(false)
                }, 500)
            }
        }
    })
  return (
    <div className='font-rubik bg-gray-200 min-h-screen flex items-center justify-center p-4'>
      <div className='bg-white w-full max-w-md p-10 rounded-lg shadow-lg'>
        <form className='space-y-6' onSubmit={formik.handleSubmit}>
          <div className='text-center'>
            <h2 className='text-3xl font-semibold
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
                className={`w-full bg-transparent text-xs text-black border-b
                ${formik.touched.email && formik.errors.email ? 'border-red-400': 'border-gray-300 focus:border-gray-600'}  py-2 pl-2 pr-10 outline-none transition-colors duration-300`}
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
                className={`w-full bg-transparent text-xs text-black border-b
                  ${formik.touched.password && formik.errors.password ? 'border-red-400': 'border-gray-300 focus:border-gray-600'}  py-2 pl-2 pr-10 outline-none transition-colors duration-300`}
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
            
              <SubmittButtonAdmin loading={loading} text='Login'/>
          </div>


        </form>

      </div>
      
    </div>
  )
}

export default LoginAdmin

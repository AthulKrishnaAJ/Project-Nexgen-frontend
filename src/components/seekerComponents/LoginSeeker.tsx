import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik";
import { useDispatch } from "react-redux";

//Files
import { seekerLoginAction } from "../../redux/actions/seekerActions";

//Styles and icons
import loginImg from '../../assets/Secure login-bro.png'
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { toast } from "sonner";

//Types
import { passwordTogglingState } from "../../types/common/commonTypes";
import { EmailWithPasswordState } from "../../types/common/commonTypes";
import { AppDispatch } from "../../types/common/commonTypes";


//Validation
import { loginValidationSchema } from "../../validations/commonValidations";

//Component
import SubmitButtonSeeker from '../commonComponents/seeker/SubmitButtonSeeker'
import GoogleAuth from "../commonComponents/GoogleAuth";




const LoginSeeker: React.FC = (): React.ReactElement => {

    const dispatch = useDispatch<AppDispatch>()
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const [field, setField] = useState<passwordTogglingState>({
        password: {
            type: 'password',
            icon: <LuEyeClosed/>
        }
    })


    const handleToggleIcon = () => {
        setField((preState) => ({
            password: {
                type: preState.password.type === 'password' ? 'text' : 'password',
                icon: preState.password.type === 'password' ? <LuEye/> : <LuEyeClosed/>
            }
        }));
    }



    const formik = useFormik({
        initialValues:{
            email: '',
            password: ''
        },
        validationSchema: loginValidationSchema,
        onSubmit: async (values: EmailWithPasswordState) => {
          setLoading(true)
          const trimData = Object.fromEntries(
                Object.entries(values).map(([key, value]) => [key, value.trim()])
                ) as EmailWithPasswordState
          console.log('Credentials at login page: ', trimData)
          try {
            const response = await dispatch(seekerLoginAction(trimData) as any)
            console.log('Response after update the store with seeker data at login component: ', response)
            if(response?.payload?.success){
              localStorage.removeItem('userEmail')
              toast.success(response.payload.message)
              setTimeout(() => {
                navigate('/', {replace: true})
              }, 500)
            } else {
              toast.error(response.payload.message)
            }
          } catch (error: any) {
            console.error('Error in after login in login component: ', error)
            toast.error('An unexpected error occured')
          } finally {
            setTimeout(() => {
              setLoading(false)
            }, 500);
          }

        }
    })


    return (
        <div className="font-rubik bg-[#F0FBFA] bg-cover bg-center md:h-screen">
      <div className="grid md:grid-cols-2 items-center gap-4 h-full">
        <div className="max-md:order-1 p-4">
          <img src={loginImg} className="lg:max-w-[85%] w-full h-full object-contain block mx-auto" alt="login-image" />
        </div>

        <div className="flex flex-col items-center gap-6 md:p-10  bg-white border rounded-lg  lg:w-8/12 lg:ml-0`">
          <form className="max-w-sm w-full mx-auto" onSubmit={formik.handleSubmit}>
            <div className="mb-8">
              <h3 className="text-3xl font-semibold
               bg-gradient-to-br from-gray-800 to-gray-500 bg-clip-text text-transparent">
                Login
                </h3>
                <p className="text-xs mt-2 text-gray-400">
                Hello, please log in to access your activity.
                </p>
            </div>

            <div className="mt-4">
              <label className="text-gray-600 text-xs block mb-1">Email</label>
              <div className="relative flex items-center">
                <input name="email" type="text" className={`w-full bg-transparent text-xs text-black border-b px-1
                     ${formik.touched.email && formik.errors.email ? 'border-red-400' : 'border-gray-300 focus:border-[#24A484]'} py-1 outline-none`} placeholder="Enter email" 
                     value={formik.values.email}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                />
                <span className="absolute right-2 text-gray-600">
                    <CiMail/>
                </span>

              </div>
              {
                formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-xs">
                            {formik.errors.email}
                            </p>
                    )
                }

            </div>
            <div className="mt-4">
              <label className="text-gray-600 text-xs block mb-1">Password</label>
              <div className="relative flex items-center">
                <input name="password"  className={`w-full bg-transparent text-xs text-black border-b px-1
                     ${formik.touched.password && formik.errors.password ? 'border-red-400' : 'border-gray-300 focus:border-[#24A484]'} py-1 outline-none`} placeholder="Enter password"
                    type={field.password.type}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <span className="absolute right-2 cursor-pointer text-gray-600"
                onClick={handleToggleIcon}
                >
                    {field.password.icon}
                </span>
              </div>
              {
                formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-xs">
                        {formik.errors.password}
                    </p>
                )
              }

            </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 font-semibold"><Link to='/emailVerify'>Forgot password ?</Link></p>
              </div>

            <div className="mt-2">
              <SubmitButtonSeeker loading={loading} text="Login"/>
            </div>
            <p className="text-sm text-gray-600 mt-4">Don't have an account? 
                <Link to='/signup' className="text-[#24A484] font-semibold hover:underline ml-1">
                    Signup here
                </Link>
            </p>
          </form>
          <div className="max-w-sm w-full mx-auto">
            <GoogleAuth role='user'/> 
          </div>
        </div>
      </div>
    </div>
    )
}


export default LoginSeeker
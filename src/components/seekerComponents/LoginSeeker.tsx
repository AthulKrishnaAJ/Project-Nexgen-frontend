import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useDispatch } from "react-redux";


//Files
import { seekerLoginAction } from "../../redux/actions/seekerActions";

//Styles and icons
import loginImg from '../../assets/Secure login-bro.png'
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { Loader } from "../commonComponents/spinner";


//Types
import { passwordTogglingState } from "../../types/seeker/seekerTypes";
import { toast } from "sonner";


const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
    .email('Enter valid email address')
    .required('Field is required'),
    password: Yup.string()
    .required('Field is required')
})



const LoginSeeker: React.FC = (): React.ReactElement => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState<boolean>(false)
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
        onSubmit: async (values) => {
          setLoading(true)
          try {
            console.log('Credentials at login page: ', values)
            const response = await dispatch(seekerLoginAction(values) as any)
            console.log('Response after update the store with seeker data at login component: ', response)
            if(response.payload.success){
              toast.success(response.payload.message)
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

        <div className="flex items-center md:p-10  bg-white border rounded-lg  lg:w-8/12 lg:ml-0`">
          <form className="max-w-sm w-full mx-auto" onSubmit={formik.handleSubmit}>
            <div className="mb-8">
              <h3 className="text-3xl font-semibold
               bg-gradient-to-br from-gray-800 to-gray-500 bg-clip-text text-transparent">
                Login
                </h3>
                <p className="text-xs mt-2 bg-gradient-to-br from-gray-800 to-gray-500 bg-clip-text text-transparent">
                    Hello, welcome back to your account
                    </p>
            </div>

            <div className="mt-4">
              <label className="text-gray-600 text-xs block mb-1">Email</label>
              <div className="relative flex items-center">
                <input name="email" type="text" className="w-full bg-transparent text-xs text-black border-b border-gray-300 focus:border-[#24A484] px-1
                     py-1 outline-none" placeholder="Enter email" 
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
                <input name="password"  className="w-full bg-transparent text-xs text-black border-b border-gray-300 focus:border-[#24A484]
                    px-1 py-1 outline-none" placeholder="Enter password"
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
            <p className="text-sm text-gray-600 mt-8">Don't have an account? 
                <Link to='/signup' className="text-[#24A484] font-semibold hover:underline ml-1">
                    Signup here
                </Link>
            </p>

            <div className="mt-4 flex ">
              <button type="submit" className="w-full shadow-xl py-3 px-4 text-sm text-white font-semibold rounded-md bg-[#24A484] hover:bg-[#298872] focus:outline-none transition-colors">
                {loading ? <Loader size={16}/> : 'Login'}
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
    )
}


export default LoginSeeker
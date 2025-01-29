import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

//Files
import { signupSeeker } from "../../apiServices/seekerApi";
import {signupValidationSchema} from "../../validations/seekerValidations";

//Styles and icons
import { LuEye } from "react-icons/lu";
import { LuEyeClosed } from "react-icons/lu";
import { CiMobile3, CiMail } from "react-icons/ci";
import signupImg from '../../assets/signupImg.png'
import { toast } from 'sonner'


//Types
import { passwordTogglingState } from "../../types/common/commonTypes";
import { UserPrimaryDetailsState } from "../../types/seeker/seekerTypes";

//Components
import SubmitButtonSeeker from "../commonComponents/seeker/SubmitButtonSeeker";




const SignupSeeker: React.FC = (): React.ReactElement => {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [field, setField] = useState<passwordTogglingState>({
    password: { type: 'password', icon: <LuEyeClosed /> },
    confirmPassword: { type: 'password', icon: <LuEyeClosed /> }
  })


  const handleToggleIcon = (field: string) => {
    setField((prev) => ({
      ...prev,
      [field]: {
        type: prev[field].type === 'password' ? 'text' : 'password',
        icon: prev[field].type === 'password' ? <LuEye /> : <LuEyeClosed />
      }
    }))

  }

  const formik = useFormik({

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

      const userData = Object.fromEntries(
        Object.entries(values).map(([key, value]) => [key, value.trim()])
        .filter(([key]) => key !== 'confirmPassword')
      ) as UserPrimaryDetailsState


      const response = await signupSeeker(userData, setLoading)
      console.log('Response after the sending Otp to the mail: ', response)
      const data = response?.data
      if (data.success) {
        toast.success(data.message)
        const otpExpirationTime = Math.floor(Date.now() / 1000) + 60 
        localStorage.setItem('userEmail', userData.email)
        localStorage.setItem('seekerOtpExpiration', otpExpirationTime.toString())
        navigate('/otp', {replace: true})
      } else {
        toast.error(data.message)
      }
      setLoading(false)
    }
  })

  return (
    <div className="font-rubik bg-[#F0FBFA] bg-cover bg-center md:h-screen">
      <div className="grid md:grid-cols-2 items-center gap-4 h-full">
        <div className="max-md:order-1 p-4">
          <img src={signupImg} className="lg:max-w-[85%] w-full h-full object-contain block mx-auto" alt="login-image" />
        </div>

        <div className="flex items-center md:p-10  bg-white border rounded-lg  lg:w-8/12 lg:ml-0`">
          <form className="max-w-sm w-full mx-auto" onSubmit={formik.handleSubmit}>
            <div className="mb-8">
              <h3 className="text-3xl font-semibold bg-gradient-to-br from-gray-800 to-gray-500 bg-clip-text text-transparent">Create an account</h3>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="" className="text-gray-600 text-xs block mb-1">First Name</label>
                <div className="relative flex items-center">
                  <input name="firstName" type="text" className={`w-full bg-transparent text-xs text-black border-b border-gray-300
                          ${formik.touched.firstName && formik.errors.firstName ? 'border-red-400': 'border-gray-300 focus:border-[#24A484]'} px-1 py-1 outline-none`} placeholder="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                </div>
                {
                  formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-red-500 text-xs">
                      {formik.errors.firstName}
                    </p>
                  )}
              </div>
              <div className="w-1/2">
                <label htmlFor="" className="text-gray-600 text-xs block mb-1">Last Name</label>
                <div className="relative flex items-center">
                  <input name="lastName" type="text" className={`w-full bg-transparent text-xs text-black border-b border-gray-300
                             ${formik.touched.lastName && formik.errors.lastName ? 'border-red-400' : 'border-gray-300 focus:border-[#24A484]'} px-1 py-1 outline-none`} placeholder="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />

                </div>
                {
                  formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-red-500 text-xs">
                      {formik.errors.lastName}
                    </p>
                  )
                }
              </div>
            </div>
            <div className="mt-4">
              <label className="text-gray-600 text-xs block mb-1">Email</label>
              <div className="relative flex items-center">
                <input name="email" type="text" className={`w-full bg-transparent text-xs text-black border-b border-gray-300
                             ${formik.touched.email && formik.errors.email ? 'border-red-400' : 'border-gray-300 focus:border-[#24A484]'} px-1 py-1 outline-none`} placeholder="Last Name"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="absolute right-2 text-gray-600">
                  <CiMail />
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
              <label className="text-gray-600 text-xs block mb-1">Mobile</label>
              <div className=" relative flex items-center">
                <input name="mobile" type="mobile" className={`w-full bg-transparent text-xs text-black border-b border-gray-300
                             ${formik.touched.mobile && formik.errors.mobile ? 'border-red-400' : 'border-gray-300 focus:border-[#24A484]'} px-1 py-1 outline-none`} placeholder="Last Name"
                  value={formik.values.mobile}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="absolute right-2 text-gray-600">
                  <CiMobile3 />
                </span>

              </div>
              {
                formik.touched.mobile && formik.errors.mobile && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.mobile}
                  </p>
                )
              }
            </div>
            <div className="mt-4">
              <label className="text-gray-600 text-xs block mb-1">Password</label>
              <div className="relative flex items-center">
                <input name="password" type={field.password.type} className={`w-full bg-transparent text-xs text-black border-b border-gray-300
                             ${formik.touched.password && formik.errors.password ? 'border-red-400' : 'border-gray-300 focus:border-[#24A484]'} px-1 py-1 outline-none`} placeholder="Last Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="absolute right-2 cursor-pointer text-gray-600"
                  onClick={() => handleToggleIcon('password')}
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
              <label className="text-gray-600 text-xs block mb-1">Confirm Password</label>
              <div className="relative flex items-center">
                <input name="confirmPassword" type={field.confirmPassword.type} className={`w-full bg-transparent text-xs text-black border-b border-gray-300
                             ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-400' : 'border-gray-300 focus:border-[#24A484]'} px-1 py-1 outline-none`} placeholder="Last Name"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <span className="absolute right-2 cursor-pointer text-gray-600"
                  onClick={() => handleToggleIcon('confirmPassword')}
                >
                  {field.confirmPassword.icon}
                </span>
              </div>
              {
                formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.confirmPassword}
                  </p>
                )
              }
            </div>
            <p className="text-sm text-gray-600 mt-8">Already have an account? 
              <Link to='/login' className="text-[#24A484] font-semibold hover:underline ml-1">
                Login here
              </Link>
            </p>

            <div className="mt-2 flex ">
              <SubmitButtonSeeker loading={loading} text="Create account"/>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignupSeeker
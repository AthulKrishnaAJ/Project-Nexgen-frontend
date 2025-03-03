import React, {useState, useEffect} from 'react'
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
dayjs.extend(customParseFormat);

import prepareDataForPostApi from '@/utils/prepateDataForPostApis';

//Api's
import { fetchStatesAndCitiesService } from '@/apiServices/commonApi';
import { seekerEditProfileAction } from '@/redux/actions/seekerActions';
import { fetchSeekerDetailsService } from '@/apiServices/seekerApi';

//Styles and icons
import {toast} from 'sonner'

//Components
import SubmitButtonSeeker from '../commonComponents/seeker/SubmitButtonSeeker';
import { DatePicker } from 'antd';

//Validations
import { seekerEditProfileValidation } from '@/validations/seekerValidations';

//Types and interfaces
import { RootState } from '@/types/common/commonTypes';
import { AppDispatch } from '@/types/common/commonTypes';
import { SeekerProfileDatas } from '@/types/seeker/seekerInterfaces';







const EditProfileSeeker: React.FC = () => {

    const [locationLoading, setLocationLoading] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [pincodeError, setPincodeError] = useState<string | null>(null)
    const seekerId = useSelector((state: RootState) => state?.seeker?.seekerInfo?._id) as string
    const dispatch = useDispatch<AppDispatch>()
    const [seekerData, setSeekerData] = useState<SeekerProfileDatas | null>(null)
    const navigate = useNavigate()

    const dateFormat = 'YYYY-MM-DD';
    const date = new Date()
    const formattedDate = dayjs(date).format(dateFormat)
    const genderOptions = ['Male', 'Female', 'Other'];

  useEffect(() => {
        const fetchSeeker = async () => {
            try {
                const response = await fetchSeekerDetailsService(seekerId)
                if(response?.data){
                    setSeekerData(response.data?.seekerData)
                }
            } catch (error: any) {
                console.error('Error in fetching seeker detail in profile component: ', error.message)
            }
        }
        fetchSeeker()
  }, [])



    const formik = useFormik({
        enableReinitialize: true,
        initialValues:{
            firstName: seekerData?.firstName ?? '',
            lastName: seekerData?.lastName ?? '',
            mobile: seekerData?.mobile ?? '',
            dateOfBirth: seekerData?.dateOfBirth ?? '',
            pincode: seekerData?.pincode ?? '',
            state: seekerData?.state ?? '',
            city: seekerData?.city ?? '',
            gender: seekerData?.gender ?? '',
            bio: seekerData?.bio ?? '',
        },
        validationSchema: seekerEditProfileValidation(pincodeError),
        onSubmit: async(values) => {
            setLoading(true)
            const trimData = prepareDataForPostApi(values, [])
            try {
                const response = await dispatch(seekerEditProfileAction({seekerId, seekerData: trimData}) as any)
                console.log('Success response in edit form: ', response)
                    if(response?.payload?.success){
                        toast.success(response.payload.message)
                        setTimeout(() => {
                            navigate('/profile')
                        }, 500)
                    }
                
            } catch (error: any) {
                console.error('An error occur in edit profile form submission: ', error.message)
                toast.error('An unexpected error occur')
            } finally {
                setLoading(false)
            }
        }
    })

    const getStatesAndCities = async (pincode: string) => {
        try {
            setLocationLoading(true)
            const response = await fetchStatesAndCitiesService(pincode)
            console.log('Responseeeeeeeee: ', response)
            if(response && response.length > 0){
                const state = response[0]?.State
                const city = response[0]?.District
                formik.setFieldValue('state',state)
                formik.setFieldValue('city',city)
            } else {
                setPincodeError('Enter a valid pincode')
                formik.setFieldValue('state','')
                formik.setFieldValue('city','')
              
            }
        
        } catch (error:any) {
            console.error('Error in fetching state and cities in edit profile component: ', error.message)
            formik.setFieldTouched('pincode', true);
            formik.setErrors({ ...formik.errors, pincode: 'Error fetching pincode details' });
        } finally {
            setLocationLoading(false)
        }
    }

  return (
    <div className='p-4'>
        <div className='p-20 max-w-3xl mx-auto shadow-lg bg-white rounded-lg my-6'>
                <h2 className='text-2xl font-semibold text-gray-700 mb-6'>Edit your personal details</h2>
            <form className='space-y-6' onSubmit={formik.handleSubmit}>
            
                <div>
                    <label className='block text-gray-700 text-xs'>First Name</label>
                    <input 
                    type="text"
                    name="firstName"
                    className={`w-full text-sm p-2 border border-gray-300  outline-none rounded mt-1`} 
                    placeholder='Enter first name'
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                            <p className='text-red-500 text-xs'>{formik.errors.firstName}</p>
                        )}
                </div>

                <div>
                    <label className='block text-gray-700 text-xs'>Last Name</label>
                    <input 
                    type="text"
                    name="lastName"
                    className={`w-full text-sm p-2 border border-gray-300 outline-none rounded mt-1`} 
                    placeholder='Enter last name'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                            <p className='text-red-500 text-xs'>{formik.errors.lastName}</p>
                        )}
                </div>

                <div>
                    <label className='block text-gray-700 text-xs'>Mobile</label>
                    <input 
                    type="text"
                    name="mobile"
                    className={`w-full text-sm p-2 border border-gray-300 outline-none rounded mt-1`} 
                    placeholder='Enter mobile number'
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    {formik.touched.mobile && formik.errors.mobile && (
                            <p className='text-red-500 text-xs'>{formik.errors.mobile}</p>
                        )}
                </div>

                <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label className='block text-gray-700 text-xs'>Date of birth</label>
                    <DatePicker
                        className='w-full text-sm p-[6.5px] border border-gray-300 outline-none rounded mt-1 cursor-pointer'
                        maxDate={dayjs(formattedDate, dateFormat)}
                        onChange={(_, dateString) => formik.setFieldValue('dateOfBirth', dateString)}
                        value={formik.values.dateOfBirth ? dayjs(formik.values.dateOfBirth) : ''}
                        inputReadOnly
                    />
                    {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                                <p className='text-red-500 text-xs'>{formik.errors.dateOfBirth}</p>
                            )}
                    
                </div>
                <div>
                        <label className='block text-gray-700 text-xs'>Gender</label>
                            <select 
                            name='gender' 
                            className={`w-full text-sm p-2 border border-gray-300 outline-none rounded mt-1`} 
                            onChange={formik.handleChange}
                            value={formik.values.gender}
                            >
                                <option value="">Select Gender</option>
                                {genderOptions.map((gender) =>(
                                        <option key={gender} value={gender}>
                                            {gender}
                                        </option>
                                ))}
                            </select>
                            {formik.touched.gender && formik.errors.gender && (
                                <p className='text-red-500 text-xs'>{formik.errors.gender}</p>
                            )}
                    </div>
                </div>

                <div className='grid grid-cols-3 gap-4'>
                <div>
                        <label className='block text-gray-700 text-xs'>Pincode</label>
                        <input 
                            type="text"
                            name="pincode"
                            className={`w-full text-sm p-2 border border-gray-300 outline-none rounded mt-1`} 
                            placeholder='Enter pincode'
                            value={formik.values.pincode}
                            onChange={(e) => {
                                formik.handleChange(e)
                                setPincodeError(null)
                                if(e.target.value.length === 6){
                                    getStatesAndCities(e.target.value)
                                }
                            }}
                            onBlur={formik.handleBlur}
                    />
                    {formik.touched.pincode && formik.errors.pincode && (
                                <p className='text-red-500 text-xs'>{formik.errors.pincode}</p>
                            )}
                    </div>
                    <div>
                        <label className='block text-gray-700 text-xs'>State</label>
                        <input 
                            type="text"
                            name="state"
                            className={`w-full text-sm p-2 border border-gray-300 outline-none rounded mt-1 
                                ${locationLoading ? 'placeholder-themeColor' : ''}`} 
                            placeholder={`${locationLoading ? 'finding...' : 'Auto-Fill'}`}
                            value={formik.values.state}
                            readOnly
                    />
                    </div>

                    <div>
                        <label className='block text-gray-700 text-xs'>District</label>
                            <input 
                                type="text"
                                name="city"
                                className={`w-full text-sm p-2 border border-gray-300 outline-none rounded mt-1
                                    ${locationLoading ? 'placeholder-themeColor' : ''}`} 
                                placeholder={`${locationLoading ? 'finding...' : 'Auto-Fill'}`}
                                value={formik.values.city}
                                readOnly
                        />
                    </div>
                </div>
                <div>
                        <label className='block text-gray-700 text-xs'>Bio</label>
                        <textarea 
                            name="bio"
                            rows={3}
                            className='w-full text-sm p-2 border border-gray-300 outline-none rounded mt-1'
                            placeholder='Tell us about yourself...'
                            value={formik.values.bio}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                    
                        ></textarea>
                        {formik.touched.bio && formik.errors.bio && (
                                <p className='text-red-500 text-xs'>{formik.errors.bio}</p>
                            )}
                    
                    </div>
                    <SubmitButtonSeeker loading={loading} text='Submit'/>
            </form>
            </div>
        </div>
  )
}

export default EditProfileSeeker

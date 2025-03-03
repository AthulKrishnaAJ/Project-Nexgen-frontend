import React, {useState, useEffect} from 'react'
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//Apis
import { companyJobPostService, getCompanyDetails } from '../../apiServices/companyApi';

//Utils
import prepareDataForPostApi from '../../utils/prepateDataForPostApis';

//Styles and icons
import { IoIosAdd } from "react-icons/io";
import { toast } from 'sonner';
import { AiOutlineDelete } from "react-icons/ai";

//Components
import SubmitButtonEmployer from '../commonComponents/employer/SubmitButtonEmployer';
import { Button } from '../ui/button';

//Types and interfaces
import { RootState } from '../../types/common/commonTypes';
import { LocationForJob } from '@/types/company/comapanyInterfaces';

//Validations
import { jobPostValidationSchema } from '../../validations/companyValidations';



const JobPostCompany: React.FC = () => {
    const companyId = useSelector((state: RootState) => state?.company?.employerInfo?._id)
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const [location, setLocation] = useState<LocationForJob>({state: '', district: ''})

    useEffect(() => {
        async function getCompany() {
            try {
                const response = await getCompanyDetails(companyId as string)
                console.log('Success response after fetching companyDetails: ', response)
                if(response?.data?.companyData){
                    const {companyData} = response.data
                    setLocation({state: companyData.state, district: companyData.district})
                }
            } catch (error: any) {
                console.error('Error in fetching company details in Posting job component: ', error)
            }
        }
         getCompany()
        
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: "",
            state: location.state ?? "",
            district: location.district ?? "",
            employmentType: "",
            workMode: "",
            minSalary: "",
            maxSalary: "",
            minExperience: "",  
            maxExperience: "",  
            skills: [],
            requirements: [],
            benefits: [],
            description: "",
        },
        validationSchema: jobPostValidationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            const trimData = prepareDataForPostApi(values, [])
            const formData = {...trimData, companyId}
            try {
                const response = await companyJobPostService(formData)
                if(response?.data?.status){
                    toast.success(response.data.message)
                    setTimeout(() => {
                        navigate('/employer/jobs')
                    }, 500)
                }
            } catch (error) {
                console.error('Error in jobPost form component: ', error)
                toast.error('An unexpected error occured')
            } finally {
                setLoading(false)
            }
        }
    })
    
    const dropdownFields: { label: string; name: keyof typeof formik.values; options: string[] }[] = [
        {label: 'Employment Type', options: ['Full-time', 'Part-time', 'Intership'], name: 'employmentType'},
        {label: 'Work Mode', options: ['On-site', 'Hybrid', 'Remote'], name: 'workMode'},
    ]

    const arrayOfFields: {label: string; name: keyof typeof formik.values}[] = [
        { label: 'Skills', name: 'skills'},
        { label: 'Requirements', name: 'requirements' },
        { label: 'Benefits', name: 'benefits' }
      ]

      const salaryFields: {label: string; name: keyof typeof formik.values}[] = [
        { label: "Minimum Salary", name: "minSalary" },
        { label: "Maximum Salary", name: "maxSalary" },
      ];

      const experienceFields: {label:string; name: keyof typeof formik.values; options: string[]}[] = [
        { label: "Minimum Experience", name: "minExperience", options: ["0","1", "2", "3", "4", "5"] },
        { label: "Maximum Experience", name: "maxExperience", options: ["1", "2", "3", "4","5", "6", "7", "8+"] }
      ]


      const addField = (field: keyof typeof formik.values) => {
        formik.setFieldValue(field, [...formik.values[field], ''])
      }

      const removeField = (field: keyof typeof formik.values, index: number) => {
            const updateArray = [...formik.values[field]]
            updateArray.splice(index, 1)
            formik.setFieldValue(field, updateArray)
      }


  return (
    <div className='p-14 max-w-3xl mx-auto shadow-lg bg-white rounded-lg my-6'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>Post a Job</h2>
      <form className='space-y-6' onSubmit={formik.handleSubmit}>
    
        <div>
            <label className='block text-gray-700 text-xs'>Job Title</label>
            <input 
            type="text"
            name="title"
            className={`w-full text-sm p-2 border ${formik.touched.title && formik.errors.title ? 
                'border-red-400' : 'border-gray-300'} outline-none rounded mt-1`} 
            placeholder='Enter job title...'
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
                <p className="text-red-500 text-xs">{formik.errors.title}</p>
            )}
        </div>

        <div className='grid grid-cols-2 gap-4'>
            <div>
                <label className='block text-gray-700 text-xs'>State</label>
                <input 
                type="text"
                name="state"
                className={`w-full text-sm p-2 border ${formik.touched.state && formik.errors.state ? 
                    'border-red-400' : 'border-gray-300'} outline-none rounded mt-1`} 
                placeholder='Enter job location...'
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                {formik.touched.state && formik.errors.state && (
                    <p className='text-red-500 text-xs'>{formik.errors.state}</p>
                )}
            </div>
            <div>
                <label className='block text-gray-700 text-xs'>District</label>
                <input 
                type="text"
                name="district"
                className={`w-full text-sm p-2 border ${formik.touched.district && formik.errors.district ? 
                    'border-red-400' : 'border-gray-300'} outline-none rounded mt-1`} 
                placeholder='Enter job location...'
                value={formik.values.district}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />
                {formik.touched.district && formik.errors.district && (
                    <p className='text-red-500 text-xs'>{formik.errors.district}</p>
                )}
            </div>
        </div>


        <div className='grid grid-cols-2 gap-4'>
            {dropdownFields.map((field) => (
            <div key={field.name}>
                <label className='block text-gray-700 text-xs'>{field.label}</label>
                    <select 
                    name={field.name} 
                    className={`w-full text-sm p-2 border ${formik.touched[field.name] && formik.errors[field.name] ? 
                        'border-red-400' : 'border-gray-300'} outline-none rounded mt-1`} 
                    value={formik.values[field.name as keyof typeof formik.values]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    >
                        <option value="">Select {field.label}</option>
                        {field.options.map((item, index) => (
                                <option key={index} value={item}>
                                    {item}
                                </option>
                            ))}
                    </select>
                    {formik.touched[field.name] && formik.errors[field.name] && (
                     <p className="text-red-500 text-xs">{formik.errors[field.name]}</p>
                     )}
            </div>
            ))}
            {salaryFields.map((field) => (
                <div key={field.name}>
                    <label className='block text-gray-700 text-xs'>{field.label}</label>
                    <input 
                    type="text"
                    name={field.name}
                    className={`w-full text-sm p-2 border ${formik.touched[field.name] && formik.errors[field.name] ? 
                        'border-red-400' : 'border-gray-300'} outline-none rounded mt-1`} 
                    placeholder='Enter the salary...'
                    value={formik.values[field.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                    {formik.touched[field.name] && formik.errors[field.name] && (
                        <p className="text-red-500 text-xs">{formik.errors[field.name]}</p>
                    )}
                </div>
            ))}

            {experienceFields.map((field) => (
                       <div key={field.name}>
                       <label className='block text-gray-700 text-xs'>{field.label}</label>
                       <select 
                       name={field.name} 
                       className={`w-full text-sm p-2 border ${formik.touched[field.name] && formik.errors[field.name] ? 
                           'border-red-400' : 'border-gray-300'} outline-none rounded mt-1`} 
                       value={formik.values[field.name]}
                       onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                       >
                           <option value="">Select {field.label}</option>
                           {field.options.map((item, index) => (
                               <option key={index} value={item}>
                                   {item} Years
                               </option>
                           ))}
                       </select>
                       {formik.touched[field.name] && formik.errors[field.name] && (
                           <p className="text-red-500 text-xs">{formik.errors[field.name]}</p>
                       )}
                   </div>
            ))}
        </div>



        {
            arrayOfFields.map((field) => (
                <div key={field.name}>
                    <div className='flex items-center justify-between'>
                        <label className='block text-gray-700 text-xs font-semibold'>{field.label}</label>

                        <div className='flex'
                            onClick={() => addField(field.name)}
                            >
                                <Button
                                type='button'
                                className='text-xs bg-themeColor w-8 h-5 md:w-10 md:h-6 hover:bg-hoverThemeColor'
                                >
                                    add
                                </Button>
                        
                        </div>

                    </div>

                        {formik.values[field.name] && (formik.values[field.name] as string[]).map((item, index) => (
                            <div key={index} className='flex items-center' >
                            <input 
                            type="text" 
                            value={item}
                            placeholder='Enter here...'
                            className={`w-full text-sm p-2 border ${formik.touched[field.name] && formik.errors[field.name] ? 
                                'border-red-400' : 'border-gray-300'} outline-none rounded mt-1`}  
                            onChange={(e) => {
                                const updateArray = [...(formik.values[field.name] as string[])]
                                updateArray[index] = e.target.value
                                formik.setFieldValue(field.name, updateArray)
                            }}
                            onBlur={() => formik.setFieldTouched(`${field.name}[${index}]`, true)}
                            />
                                <button
                                type='button'
                                className="ml-2 text-red-500 hover:text-red-700"
                                onClick={() => removeField(field.name, index)}
                                >
                                    <AiOutlineDelete size={20}/>
                                </button>
                            </div>
                        ))}
                        {formik.touched[field.name] && formik.errors[field.name] && (
                             <p className="text-red-500 text-xs">{formik.errors[field.name]}</p>
                        )}

                </div>
            ))
        }

        <div>
            <label className='block text-gray-700 text-xs'>Description</label>
            <textarea 
            name="description"
            className={`w-full text-sm p-2 border ${formik.touched.description && formik.errors.description? 
                'border-red-400' : 'border-gray-300'} outline-none rounded mt-1`}  
            rows={3}
            placeholder='Job description...'
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
             {formik.touched.description && formik.errors.description && ( 
                <p className="text-red-500 text-xs">{formik.errors.description}</p>
                )}
        </div>

        <SubmitButtonEmployer
        loading={loading}
        text='Post job'
        />
      </form>
    </div>
  )
}

export default JobPostCompany

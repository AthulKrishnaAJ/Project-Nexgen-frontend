import React, {useState} from 'react'
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

//Apis
import { companyJobPostService } from '../../apiServices/companyApi';

//Utils
import prepareDataForPostApi from '../../utils/prepateDataForPostApis';

//Styles and icons
import { IoIosAdd } from "react-icons/io";
import { toast } from 'sonner';

//Components
import SubmitButtonEmployer from '../commonComponents/employer/SubmitButtonEmployer';

//Types and interfaces
import { RootState } from '../../types/common/commonTypes';

//Validations
import { jobPostValidationSchema } from '../../validations/companyValidations';



const JobPostCompany: React.FC = () => {
    const companyId = useSelector((state: RootState) => state?.company?.employerInfo?._id)
    const [loading, setLoading] = useState<boolean>(false)

    const formik = useFormik({
        initialValues: {
            title: "",
            location: "",
            employmentType: "",
            workMode: "",
            minSalary: "",
            maxSalary: "",
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


      const addField = (field: keyof typeof formik.values) => {
        formik.setFieldValue(field, [...formik.values[field], ''])
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

        <div>
            <label className='block text-gray-700 text-xs'>location</label>
            <input 
            type="text"
            name="location"
            className={`w-full text-sm p-2 border ${formik.touched.location && formik.errors.location ? 
                'border-red-400' : 'border-gray-300'} outline-none rounded mt-1`} 
            placeholder='Enter job location...'
            value={formik.values.location}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            />
            {formik.touched.location && formik.errors.location && (
                <p className='text-red-500 text-xs'>{formik.errors.location}</p>
            )}
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
        </div>



        {
            arrayOfFields.map((field) => (
                <div key={field.name}>
                    <div className='flex items-center justify-between'>
                        <label className='block text-gray-700 text-xs font-semibold'>{field.label}</label>

                            <div className='flex text-sm cursor-pointer'
                            onClick={() => addField(field.name)}
                            >
                            <p className=''>add</p>
                            <IoIosAdd className='self-center'/>
                        </div>

                    </div>

                        {formik.values[field.name] && (formik.values[field.name] as string[]).map((item, index) => (
                            <input 
                            key={index}
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

import React, {useState} from 'react'
import { useFormik } from 'formik'

import prepareDataForPostApi from '@/utils/prepateDataForPostApis'

//Componenets
import SubmitButtonSeeker from '../commonComponents/seeker/SubmitButtonSeeker'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../ui/select'

//Types and interface
import { ApplicationModalProp } from '@/types/common/commonInterfaces'


//Api's
import {  appyJobService } from '@/apiServices/seekerApi'

//Validations
import { appicationValidationSchema } from '@/validations/seekerValidations'

//Styles and icons
import {toast} from 'sonner'




const ApplicationFormSeeker: React.FC<ApplicationModalProp> = ({isOpen, selectedJob, onClose, seekerData}) => {

    const [loading, setLoading] = useState<boolean>(false);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            firstName: seekerData?.firstName ?? '',
            lastName: seekerData?.lastName ?? '',
            email: seekerData?.email ?? '',
            mobile: seekerData?.mobile ?? '',
            resume: '',
            coverLetter: ''
        },
        validationSchema: appicationValidationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            const trimData = prepareDataForPostApi(values, [])
            const data = {
                ...trimData,
                 jobId: selectedJob?._id,
                 companyId: selectedJob?.companyId,
                 seekerId: seekerData?._id
                }
              try {
                const response = await appyJobService(data)
                console.log('Success response in application modal: ', response)
                if(response?.data?.status){
                    toast.success(response.data.message)
                    onClose()
                }
              } catch (error: any) {
                console.error('Error in job application modal: ', error)
                toast.error('An unexpeted error occur')
              } finally {
                  setTimeout(() => {
                      setLoading(false)
                      formik.resetForm()
                  }, 1000);
              }
        }
    })

  return (
 
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className='p-10'>
            <DialogHeader>
                <DialogTitle className='text-2xl'>Apply for {selectedJob?.title}</DialogTitle>
                <DialogDescription>
                    Fill out the form below to apply for this job.
                </DialogDescription>
            </DialogHeader>
            <form className='space-y-6' onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label className='block text-gray-700 text-xs'>First Name</label>
                    <input 
                    type="text"
                    name="firstName"
                    className={`w-full text-sm p-2 border border-gray-300  outline-none rounded mt-1`} 
                    placeholder='Enter first name'
                    value={formik.values.firstName}
                    disabled
                    />
                </div>

                <div>
                    <label className='block text-gray-700 text-xs'>Last Name</label>
                    <input 
                    type="text"
                    name="lastName"
                    className={`w-full text-sm p-2 border border-gray-300 outline-none rounded mt-1`} 
                    placeholder='Enter last name'
                    value={formik.values.lastName}
                    disabled
                    />
                </div>

                <div>
                    <label className='block text-gray-700 text-xs'>Email</label>
                    <input 
                    type="text"
                    name="email"
                    className={`w-full text-sm p-2 border border-gray-300 outline-none rounded mt-1`} 
                    placeholder='Enter mobile number'
                    value={formik.values.email}
                    disabled
                  />
                
                </div>

                <div>
                    <label className='block text-gray-700 text-xs'>Mobile</label>
                    <input 
                    type="text"
                    name="mobile"
                    className={`w-full text-sm p-2 border border-gray-300 outline-none rounded mt-1`} 
                    placeholder='Enter mobile number'
                    value={formik.values.mobile}
                    disabled
                  />

                </div>
            </div>

                <div>
                    <label className="block text-gray-700 text-xs">Select Resume</label>
                    <Select onValueChange={(value) => formik.setFieldValue('resume', value)}
                        >
                        <SelectTrigger className="w-full border-gray-300 focus:ring-0 focus:outline-none ">
                            <SelectValue placeholder="Choose a resume" />
                        </SelectTrigger>
                        <SelectContent>
                            {seekerData?.resume && seekerData.resume?.length > 0 ? (
                                seekerData.resume.map((res, index) => (
                                    <SelectItem key={index} value={res}>
                                        {res.split('/').pop()}
                                    </SelectItem>
                                ))
                            ) : (   
                                <div className="text-gray-500 text-center p-2">
                                    No resumes found
                                </div>
                            )}
                        </SelectContent>
                    </Select>
                    {formik.touched.resume && formik.errors.resume && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.resume}</p>
                         )}
                    </div>



                    <div>
                        <label className='block text-gray-700 text-xs'>Cover letter</label>
                        <textarea 
                            name="coverLetter"
                            rows={3}
                            className='w-full text-sm p-2 border border-gray-300 outline-none rounded mt-1'
                            placeholder='Tell us about yourself...'
                            value={formik.values.coverLetter}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        ></textarea>
                        {formik.touched.coverLetter && formik.errors.coverLetter && (
                        <p className="text-red-500 text-xs mt-1">{formik.errors.coverLetter}</p>
                         )}
                    
                    </div>
                    <SubmitButtonSeeker loading={loading} text='Submit'/>
            </form>
         
            </DialogContent>
            </Dialog>
     
  )
}

export default ApplicationFormSeeker

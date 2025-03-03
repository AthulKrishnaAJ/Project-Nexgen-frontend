import React, {useEffect, useState} from 'react'
import { useFormik } from 'formik'

import prepareDataForPostApi from '@/utils/prepateDataForPostApis'

//Compoenents
import { Button } from '../ui/button'

//Styles and icons
import { IoIosClose } from "react-icons/io";
import { toast } from 'sonner'

//Types and interfaces
import { changeEvent } from '@/types/common/commonTypes'
import { skills } from '@/types/common/commonInterfaces'
import { SkillComponentProps } from '@/types/seeker/seekerInterfaces'

//Validations
import { skillValidationSchema } from '@/validations/seekerValidations'

//Api's
import { addSkillsService, deleteSkillService } from '@/apiServices/seekerApi'


const SkillsAdd: React.FC<SkillComponentProps> = ({seekerId, allSkills, onUploadSuccess}) => {

  const [suggestions, setSuggestions] = useState<string[]>([]);


  const formik = useFormik({
    initialValues: {
      skill: ''
    },
    validationSchema: skillValidationSchema,
    onSubmit: async (values) => {

        const trimData = prepareDataForPostApi(values, [])
        const data = {...trimData, seekerId}
        try {
          const response = await addSkillsService(data)
          console.log('Success response in SkillsAdd component: ', response)
          if(response?.data?.status){
            onUploadSuccess()
            setSuggestions([])
            formik.resetForm()
          }
        } catch (error: any) {
          console.error('Error in adding skill in SkillAdd component: ', error)
          toast.error('An unexpected error occured')
        } finally {
 
        }
    }
  })

  const handleInputChange = (event: changeEvent) =>  {
      const input = event.target.value
      formik.setFieldValue('skill', input)
      if(input.length > 0){
        const filteredSkills = skills.filter((skill) => 
            skill.toLowerCase().includes(input.toLowerCase())
        )
        setSuggestions(filteredSkills)
      } else {
        setSuggestions([])
      }
  }

  const handleSelectSkill = (skill: string) => {
    formik.setFieldValue('skill', skill)
    setSuggestions([])

  }


  const handleDelete = async (skill: string) => {
      try {
          const data = {skill, seekerId}
          const response = await deleteSkillService(data)
          console.log('Response afte deleting a skill', response)
          if(response?.data?.status){
            onUploadSuccess()
          }
      } catch (error: any) {
        console.error('Error in deleting skill in skill add component: ', error)
      }
  }

  return (

  <div className='w-full'>
    <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Add Skills</h2>
    <form onSubmit={formik.handleSubmit} className='flex flex-col space-y-1'>
      <div className='flex items-center justify-between space-x-4 border p-3 rounded-lg bg-gray-50'>
          <input 
          name='skill'
          type='text' 
          className={`w-1/2 text-sm border border-gray-300 rounded-lg p-2 pl-4
            focus:outline-none focus:ring-0`}
          value={formik.values.skill}
          onChange={handleInputChange}
          placeholder='Add your skill'

          /> 
          <Button
          type='submit'
              className="bg-themeColor hover:bg-hoverThemeColor text-white px-4 py-2 rounded-lg flex items-center"
          >
            Add
          </Button>   
      </div>
      {suggestions.length > 0 && (
        <ul className='bg-white border border-gray-300 rounded-lg w-1/2 mt-2 shadow-md max-h-40 overflow-y-auto'>
          {suggestions.map((skill, index) => (
            <li
            key={index}
            className='p-2 hover:bg-gray-100 cursor-pointer'
            onClick={() => handleSelectSkill(skill)}
            >
              {skill}
            </li>
          ))}
        </ul>
      )}
    {formik.touched.skill && formik.errors.skill && (
      <p className='text-red-500 text-xs ml-2 '>{formik.errors.skill}</p>
    )}
    </form>


    <div className='mt-14'>
        <h3 className="text-md font-medium text-gray-700 mb-4">Your Skills</h3>
        <div 
        className={`flex flex-wrap gap-3 ${allSkills.length <= 0 ? 'justify-center items-center' : ''}`}
        >
            {allSkills.length > 0 ? (
                allSkills.map((skill, index) => (
                  <div key={index} className='inline-flex items-center gap-4 border shadow-lg px-4 py-2 rounded-lg bg-gray-100'>
                    <p className='text-sm font-medium text-gray-700 truncate'>
                      {skill}
                    </p>
                      <p
                      onClick={() => handleDelete(skill)}  
                      className="text-red-500 cursor-pointer"
                      >
                          <IoIosClose size={18}/>
                      </p>
                  </div>
                ))
            ) : (
              <p className="text-gray-500 text-center">No skils added yet.</p>
            )}
                     
        </div>
    </div>
</div>
  )
}

export default SkillsAdd

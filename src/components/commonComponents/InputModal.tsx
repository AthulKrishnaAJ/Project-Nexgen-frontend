import React from 'react'
import { useFormik } from 'formik';


//Validations
import { reasonFormValidation } from '../../validations/adminValidations';

//Types and interface
import { InputModalProps } from '../../types/common/commonTypes';



const InputModal: React.FC<InputModalProps> = ({isVisible, title, onClose, onSubmit, data, action}) => {


    if(!isVisible){
        return null
    }

    const formik = useFormik({
        initialValues: {
            reason: ''
        },
        validationSchema: reasonFormValidation,
        onSubmit: (values) => {
            onSubmit(data, action as string, values.reason)
            onClose()
        }
    })

  return (
        <div
            className="fixed inset-0 p-4 flex flex-wrap justify-end items-end w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-rubik">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 relative">
                <div className="flex items-center pb-3 border-b border-gray-300">
                    <h3 className="text-gray-800 text-xl font-bold flex-1">{title}</h3>
                </div>

                <form onSubmit={formik.handleSubmit}>
                    <div className="my-6">
                        <textarea
                        name='reason'
                        placeholder="Enter the reason for rejection..."
                        className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                        rows={4}
                        value={formik.values.reason}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />
                    {formik.touched.reason && formik.errors.reason && (
                        <p className='text-red-500 text-sm'>{formik.errors.reason}</p>
                    )}
                    </div>

                    <div className="border-t border-gray-300 pt-6 flex justify-end gap-4">
                        <button
                        type="button"
                        
                        className="px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-300 hover:bg-gray-300 active:"
                        onClick={() => onClose()}
                        >
                        Cancel
                        </button>
                        <button
                        type="submit"
                        className="px-4 py-2 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-gray-800 hover:bg-gray-900  duration-100"
                        >
                        Submit
                        </button>
                    </div>
        </form>
            </div>
        </div>
  )
}

export default InputModal

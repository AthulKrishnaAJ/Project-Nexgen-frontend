import * as Yup from 'yup'

export const reasonFormValidation = Yup.object({
    reason: Yup.string().trim()
    .required('Reason is required')
    .min(10, 'Minimum 10 characters')
})
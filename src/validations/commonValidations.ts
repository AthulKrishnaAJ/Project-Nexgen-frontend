import * as Yup from 'yup'


export const verifyEmailValidationSchema = Yup.object({
    email: Yup.string().trim()
    .email('Enter valid email address')
    .required('Field is required')
})


 export const changePasswordValidationSchema = Yup.object({
    password: Yup.string().trim()
    .required('Password is required')
    .min(6, 'Password must be 6 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Contain lowercase, uppercase, number and special character'
    ),
    confirmPassword: Yup.string().trim()
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Password must match')
})



export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
    .transform((value) => value.trim())
    .email('Enter valid email address')
    .required('Field is required'),
    password: Yup.string()
    .transform((value) => value.trim())
    .required('Field is required')
})



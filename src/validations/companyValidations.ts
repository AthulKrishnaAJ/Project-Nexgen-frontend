import * as Yup from 'yup'


export const companyValidationSchema = Yup.object({
  companyName: Yup.string().trim()
  .transform((value) => value.trim())
  .required('Company name required')
  .matches(/^[a-zA-Z\s]*$/, 'Must contain only letters')
  .min(2, 'Must contain at least 2 characters'),
  industry: Yup.string().trim()
  .required('Industry is required')
  .matches(/^[a-zA-Z\s]*$/, 'Must contain only letters')
  .min(2, 'Must contain at least 2 characters'),
  email: Yup.string()
  .transform((value) => value.trim())
  .required('Email is required')
  .email('Use valid email address'),
  mobile: Yup.string()
  .transform((value) => value.trim())
  .required('Mobile number is required')
  .matches(/^\d+$/, 'Mobile number must contain only numbers') 
  .length(10, 'Mobile number must be exactly 10 digits'), 
  password: Yup.string()
  .transform((value) => value.trim())
  .required('Password is required')
  .min(6, 'Password must be 6 characters')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    'Must contain, lowercase, uppercase, number and special character'
  ),
  confirmPassword: Yup.string()
    .transform((value) => value.trim())
    .required('Confirm password is required')
    .oneOf([Yup.ref('password')], 'Password must match')
})
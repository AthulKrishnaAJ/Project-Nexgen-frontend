import * as Yup from 'yup'

export const signupValidationSchema = Yup.object({

  firstName: Yup.string().trim()
  .transform((value) => value.trim())
  .required('First name is required')
  .matches(/^[a-zA-Z\s]*$/, 'Must contain only letters')
  .min(2, 'Must contain at least 2 characters'),
  lastName: Yup.string()
  .transform((value) => value.trim())
  .required('Last name is required')
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


export const seekerEditProfileValidation = (pincodeError?: string | null) => {

      return Yup.object({
        pincode: Yup.string().trim()
      .required('Pincode is required')
      .length(6, 'Pincode must contain 6 digits')
        .test('validPincode', pincodeError || '', () => {
          if(pincodeError) return false
          return true
        }),
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      mobile: Yup.string().required('Mobile number is required')
      .matches(/^[0-9]{10}$/, 'Invalid mobile number'),
      dateOfBirth: Yup.string().required('Date of birth is required'),
      gender: Yup.string().required('Gender is required'),
        bio: Yup.string().trim()
        .required('Bio is required')
        .min(10, 'Enter minimun 10 characters')
        
    })
}
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



export const jobPostValidationSchema = Yup.object({
  title: Yup.string().trim()
  .required("Job title is required"),
  location: Yup.string().trim()
  .required("Location is required"),
  employmentType: Yup.string()
  .oneOf(["Full-time", "Part-time", "Internship"], "Select a valid employment type")
  .required("Employment type is required"),
  workMode: Yup.string()
  .oneOf(["On-site", "Hybrid", "Remote"], "Select a valid work mode")
  .required("Work mode is required"),
  minSalary: Yup.string().trim()
  .required("Minimum salary is required")
  .matches(/^-?\d+$/, "Must contain only numbers") 
  .test("isPositive", "Salary must be greater than 0", (value) => 
    value ? parseInt(value) > 0 : true
  ),
  maxSalary: Yup.string().trim()
  .required("Maximum salary is required")
  .matches(/^-?\d+$/, "Must contain only numbers") 
   .test("isPositive", "Salary must be greater than 0", (value) =>
     value ? parseInt(value) > 0 : true
   )
   .test("isGreaterThanMin", "Maximum salary must be greater than minimum salary", function(value) {
     return value && parseInt(this.parent.minSalary) ? 
       parseInt(value) > parseInt(this.parent.minSalary) : true;
   }),
  skills: Yup.array()
  .min(1, "At least one skill is required")
  .test("noEmptyValues", "Skills cannot contain empty values", (values) => {
    if (!values) return false;
    return values.every((item) => item && item.trim && item.trim() !== "");
  }),
  requirements: Yup.array()
  .min(1, "At least one requirement is required")
  .test("noEmptyValues", "Requirements cannot contain empty values", (values) => {
    if (!values) return false;
    return values.every((item) => item && item.trim && item.trim() !== "");
  }),
  benefits: Yup.array()
  .min(1, "At least one benefit is required")
  .test("noEmptyValues", "Benefits cannot contain empty values", (values) => {
    if (!values) return false;
    return values.every((item) => item && item.trim && item.trim() !== "");
  }),
  description: Yup.string().trim()
  .required("Job description is required"),
});
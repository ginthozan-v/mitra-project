import * as Yup from 'yup';

export const formFieldData = [
    {
        label: 'Employee Id',
        name: 'employeeId',
        fieldType: 'text',
        placeholder: 'Employee Id',
    },
    {
        label: 'Email',
        name: 'email',
        fieldType: 'email',
        placeholder: 'Email',
    },
    {
        label: 'First Name',
        name: 'firstName',
        fieldType: 'text',
        placeholder: 'First Name',
    },
    {
        label: 'Last Name',
        name: 'lastName',
        fieldType: 'text',
        placeholder: 'Last Name',
    },
    {
        label: 'Designation',
        name: 'designation',
        fieldType: 'text',
        placeholder: 'Designation',
    },
    {
        label: 'isActive',
        name: 'active',
        fieldType: 'toggle',
    },
    {
        label: 'Role',
        name: 'role',
        fieldType: 'roles-select',
    },
];

export const schema = {
    employeeId: Yup.string()
    .required('This field cannot be empty'),
    email: Yup.string().email('Invalid email').required('This field cannot be empty'),
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('This field cannot be empty'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('This field cannot be empty'),
    designation: Yup.string().required('This field cannot be empty'),
    role: Yup.string().required("This field cannot be empty")
  };
import * as Yup from 'yup';

export const formFieldData = [{
        label: 'Logo title',
        name: 'title',
        fieldType: 'text',
        placeholder: 'Logo Title',
    },
    {
        label: 'Logo image',
        name: 'logoImage',
        accept:'.jpg,.jpeg,.png',
        fieldType: 'image',
    },
    {
        label: 'Redirection link',
        name: 'redirectionLink',
        fieldType: 'text',
        placeholder: 'Redirection Link',
    },
    {
        label: 'Priority',
        name: 'priority',
        fieldType: 'number',
        placeholder: '',
    },
    {
        label: 'isActive',
        name: 'isActive',
        fieldType: 'toggle',
    },
];
export const schema = {
    title: Yup.string().max(255, 'Max characters 255 only allowed').required('This field cannot be empty'),
    logoImage: Yup.string().required('This field cannot be empty'),
    redirectionLink: Yup.string().url('URL is not valid').required('This field cannot be empty'),
    priority: Yup.number().positive().integer().typeError('you must specify a number').required('This field cannot be empty'),
};